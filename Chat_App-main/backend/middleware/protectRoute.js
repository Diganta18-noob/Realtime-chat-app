import jwt from "jsonwebtoken";
import { supabase } from "../config/supabase.js";

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

    const { data: user, error } = await supabase
      .from('users')
      .select('id, full_name, username, profile_pic, role, is_banned')
      .eq('id', decoded.userID)
      .maybeSingle();

    if (error || !user) {
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
