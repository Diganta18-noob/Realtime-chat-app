import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { supabase } from "../config/supabase.js";
import generateTokens from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .ilike('username', username)
      .maybeSingle();

    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const avatarStyle = gender === "female" ? "adventurer" : "adventurer-neutral";
    const profilePic = `https://api.dicebear.com/9.x/${avatarStyle}/svg?seed=${encodeURIComponent(username)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;

    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert([{
        full_name: fullName,
        username,
        password: hashedPassword,
        gender,
        profile_pic: profilePic
      }])
      .select()
      .single();

    if (insertError) {
      // Postgres Unique Violation (23505)
      if (insertError.code === '23505') {
        return res.status(400).json({ error: "Username already taken" });
      }
      console.log(insertError);
      return res.status(400).json({ error: "Invalid user data" });
    }

    if (!newUser) {
      return res.status(400).json({ error: "Could not create user" });
    }

    const accessToken = generateTokens(newUser.id, "user", res);

    await supabase.from('audit_logs').insert([{
      user_id: newUser.id,
      action: "LOGIN",
      ip_address: req.ip,
      user_agent: req.headers["user-agent"],
      details: "Account created",
    }]);

    res.status(201).json({
      _id: newUser.id,
      fullName: newUser.full_name,
      username: newUser.username,
      profilePic: newUser.profile_pic,
      role: newUser.role,
      isBanned: newUser.is_banned,
      accessToken,
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error", details: error.message, stack: error.stack });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const { data: user } = await supabase
      .from('users')
      .select('*')
      .ilike('username', username)
      .maybeSingle();

    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    if (user.is_banned) {
      return res.status(403).json({
        error: "Your account has been restricted by an administrator.",
      });
    }

    if (user.is_deleted) {
      return res.status(403).json({
        error: "This account has been deleted.",
      });
    }

    const accessToken = generateTokens(user.id, user.role, res);

    await supabase.from('audit_logs').insert([{
      user_id: user.id,
      action: user.role === "admin" ? "ADMIN_LOGIN" : "LOGIN",
      ip_address: req.ip,
      user_agent: req.headers["user-agent"],
    }]);

    res.status(200).json({
      _id: user.id,
      fullName: user.full_name,
      username: user.username,
      profilePic: user.profile_pic,
      role: user.role,
      isBanned: user.is_banned,
      accessToken,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    const refreshTokenCookie = req.cookies.refreshToken;
    if (refreshTokenCookie) {
      try {
        const refreshSecret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
        const decoded = jwt.verify(refreshTokenCookie, refreshSecret);
        await supabase.from('audit_logs').insert([{
          user_id: decoded.userID,
          action: "LOGOUT",
          ip_address: req.ip,
          user_agent: req.headers["user-agent"],
        }]);
      } catch {
        // Token expired or invalid
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

    const accessToken = generateTokens(decoded.userID, decoded.role, res);
    res.status(200).json({ accessToken });
  } catch (error) {
    console.log("Error in refresh token controller", error.message);
    return res.status(401).json({ error: "Unauthorized - Invalid Refresh Token" });
  }
};

export const checkUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const { data } = await supabase
      .from('users')
      .select('id')
      .ilike('username', username)
      .maybeSingle();
      
    res.status(200).json({ available: !data });
  } catch (error) {
    console.log("Error in checkUsername controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = {
      _id: req.user.id || req.user._id,
      fullName: req.user.full_name || req.user.fullName,
      username: req.user.username,
      profilePic: req.user.profile_pic || req.user.profilePic,
      role: req.user.role,
      isBanned: req.user.is_banned || req.user.isBanned,
    };
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in getMe controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
