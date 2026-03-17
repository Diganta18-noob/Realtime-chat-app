import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    let token;
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else if (req.cookies && (req.cookies.token || req.cookies.accessToken)) {
      token = req.cookies.token || req.cookies.accessToken;
    }

    if (!token) {
      return res.status(401).json({ error: "Unauthorized no Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized Token Invalid" });
    }

    // Attach fresh user from DB
    const user = await User.findById(decoded.userID).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired, please login again" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    }
    console.log("Error on protectRoute", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default protectRoute;
