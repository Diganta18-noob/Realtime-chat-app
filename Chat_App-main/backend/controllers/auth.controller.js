import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import AuditLog from "../models/auditLog.model.js";
import generateTokens from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://ui-avatars.com/api/?name=${username}&background=random`;
    const girlProfilePic = `https://ui-avatars.com/api/?name=${username}&background=random`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      const accessToken = generateTokens(newUser._id, res);
      await newUser.save();

      // Log signup as login event
      await AuditLog.create({
        userId: newUser._id,
        action: "LOGIN",
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"],
        details: "Account created",
      });

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
        role: newUser.role,
        isBanned: newUser.isBanned,
        accessToken,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error", details: error.message, stack: error.stack });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // Check if user is banned
    if (user.isBanned) {
      return res.status(403).json({
        error: "Your account has been restricted by an administrator.",
      });
    }

    const accessToken = generateTokens(user._id, res);

    // Log login event
    await AuditLog.create({
      userId: user._id,
      action: user.role === "admin" ? "ADMIN_LOGIN" : "LOGIN",
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
    });

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
      role: user.role,
      isBanned: user.isBanned,
      accessToken,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    // Try to log the logout event
    const refreshTokenCookie = req.cookies.refreshToken;
    if (refreshTokenCookie) {
      try {
        const refreshSecret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
        const decoded = jwt.verify(refreshTokenCookie, refreshSecret);
        await AuditLog.create({
          userId: decoded.userID,
          action: "LOGOUT",
          ipAddress: req.ip,
          userAgent: req.headers["user-agent"],
        });
      } catch {
        // Token expired or invalid — still allow logout
      }
    }

    res.cookie("refreshToken", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshTokenCookie = req.cookies.refreshToken;

    if (!refreshTokenCookie) {
      return res.status(401).json({ error: "Unauthorized - No Refresh Token" });
    }

    const refreshSecret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
    const decoded = jwt.verify(refreshTokenCookie, refreshSecret);

    const accessToken = generateTokens(decoded.userID, res);

    res.status(200).json({ accessToken });
  } catch (error) {
    console.log("Error in refresh token controller", error.message);
    return res.status(401).json({ error: "Unauthorized - Invalid Refresh Token" });
  }
};
export const checkUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const exists = await User.exists({ username });
    res.status(200).json({ available: !exists });
  } catch (error) {
    console.log("Error in checkUsername controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
