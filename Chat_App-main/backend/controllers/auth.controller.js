import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { OAuth2Client } from "google-auth-library";
import { supabase } from "../config/supabase.js";
import generateTokens from "../utils/generateToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import logger from "../utils/logger.js";
import { io } from "../socket/socket.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, email, password, confirmPassword, gender } = req.body;

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

    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert([{
        full_name: fullName,
        username,
        email: email || null,
        password: hashedPassword,
        gender,
        profile_pic: profilePic,
        email_verification_token: verificationToken,
        email_verification_expires: verificationExpires
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

    if (email) {
      try {
        const verifyUrl = `${process.env.CLIENT_URL || "http://localhost:3000"}/verify-email?token=${verificationToken}`;
        await sendEmail({
          email,
          subject: "Verify Your Email",
          message: `<p>Please click the following link to verify your email:</p><a href="${verifyUrl}">${verifyUrl}</a>`,
        });
      } catch (emailError) {
        // Email failure should NOT block signup — user is already created
        logger.error("Failed to send verification email during signup", { error: emailError.message, userId: newUser.id });
      }
    }

    // Broadcast to all connected clients so their sidebar updates instantly
    io.emit("newUserJoined", {
      _id: newUser.id,
      fullName: newUser.full_name,
      username: newUser.username,
      profilePic: newUser.profile_pic,
      isGroup: false,
    });

    res.status(201).json({
      _id: newUser.id,
      fullName: newUser.full_name,
      username: newUser.username,
      profilePic: newUser.profile_pic,
      role: newUser.role,
      isBanned: newUser.is_banned,
      isEmailVerified: newUser.is_email_verified,
      isUsernameSet: newUser.is_username_set ?? true,
      accessToken,
    });
  } catch (error) {
    logger.error("Error in signup controller", { error: error.message });
    res.status(500).json({ error: "Internal Server Error" });
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
      isUsernameSet: user.is_username_set ?? true,
      accessToken,
    });
  } catch (error) {
    logger.error("Error in login controller", { error: error.message });
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
    logger.error("Error in logout controller", { error: error.message });
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
    logger.error("Error in refresh token controller", { error: error.message });
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
    logger.error("Error in checkUsername controller", { error: error.message });
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
      isUsernameSet: req.user.is_username_set ?? true,
    };
    res.status(200).json(user);
  } catch (error) {
    logger.error("Error in getMe controller", { error: error.message });
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;
    
    const { data: user } = await supabase
      .from('users')
      .select('id, email_verification_expires')
      .eq('email_verification_token', token)
      .maybeSingle();

    if (!user || new Date(user.email_verification_expires) < new Date()) {
      return res.status(400).json({ error: "Invalid or expired verification token." });
    }

    await supabase
      .from('users')
      .update({
        is_email_verified: true,
        email_verification_token: null,
        email_verification_expires: null,
      })
      .eq('id', user.id);

    res.status(200).json({ message: "Email verified successfully." });
  } catch (error) {
    logger.error("Error in verifyEmail controller", { error: error.message });
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) return res.status(400).json({ error: "Email is required." });

    const { data: user } = await supabase
      .from('users')
      .select('id, email')
      .eq('email', email)
      .maybeSingle();

    if (!user) {
      // Return 200 even if user not found to prevent email enumeration
      return res.status(200).json({ message: "If an account with that email exists, we sent a password reset link." });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetExpires = new Date(Date.now() + 60 * 60 * 1000).toISOString();

    await supabase
      .from('users')
      .update({
        reset_password_token: resetToken,
        reset_password_expires: resetExpires,
      })
      .eq('id', user.id);

    const resetUrl = `${process.env.CLIENT_URL || "http://localhost:3000"}/reset-password?token=${resetToken}`;

    // Always log the reset link so developers can test locally
    logger.info(`Password reset link for ${user.email}: ${resetUrl}`);

    const result = await sendEmail({
      email: user.email,
      subject: "Password Reset Request",
      message: `<p>You requested a password reset. Click the link below to set a new password:</p>
                <a href="${resetUrl}">${resetUrl}</a>
                <p>If the link doesn't work, copy and paste this URL into your browser: <br/>${resetUrl}</p>
                <p>This link is valid for 1 hour.</p>`,
    });

    if (!result.success) {
      logger.warn("Password reset email could not be delivered", { email: user.email, reason: result.reason });
      return res.status(200).json({
        message: "Password reset link generated. If email delivery fails, please contact an administrator.",
        warning: "Email delivery may be unavailable. Check server logs for the reset link.",
      });
    }

    res.status(200).json({ message: "If an account with that email exists, we sent a password reset link." });
  } catch (error) {
    logger.error("Error in forgotPassword controller", { error: error.message });
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const { data: user } = await supabase
      .from('users')
      .select('id, reset_password_expires')
      .eq('reset_password_token', token)
      .maybeSingle();

    if (!user || new Date(user.reset_password_expires) < new Date()) {
      return res.status(400).json({ error: "Invalid or expired reset token." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await supabase
      .from('users')
      .update({
        password: hashedPassword,
        reset_password_token: null,
        reset_password_expires: null,
      })
      .eq('id', user.id);

    res.status(200).json({ message: "Password reset correctly. You can now log in." });
  } catch (error) {
    logger.error("Error in resetPassword controller", { error: error.message });
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const resetPasswordByUsername = async (req, res) => {
  try {
    const { username, newPassword } = req.body;

    if (!username || !newPassword) {
      return res.status(400).json({ error: "Username and new password are required." });
    }

    const { data: user } = await supabase
      .from('users')
      .select('id')
      .ilike('username', username)
      .maybeSingle();

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await supabase
      .from('users')
      .update({ password: hashedPassword })
      .eq('id', user.id);

    res.status(200).json({ message: "Password force reset successfully. You can now log in." });
  } catch (error) {
    logger.error("Error in resetPasswordByUsername controller", { error: error.message });
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const googleAuth = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: "Google token is required" });
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    if (!clientId) {
      logger.error("GOOGLE_CLIENT_ID not set in environment variables");
      return res.status(500).json({ error: "Google authentication is not configured" });
    }

    const client = new OAuth2Client(clientId);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: clientId,
    });

    const payload = ticket.getPayload();
    const { email, name, picture, sub: googleId } = payload;

    if (!email) {
      return res.status(400).json({ error: "Google account must have an email" });
    }

    // Check if user already exists with this email
    let { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    let user;

    if (existingUser) {
      // Existing user — log them in
      user = existingUser;
    } else {
      // New user — auto-register
      const usernameBase = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '');
      let username = usernameBase;
      let suffix = 1;

      // Ensure unique username
      while (true) {
        const { data: taken } = await supabase
          .from('users')
          .select('id')
          .ilike('username', username)
          .maybeSingle();
        if (!taken) break;
        username = `${usernameBase}${suffix}`;
        suffix++;
      }

      // Generate a random password (user won't need it — they'll use Google)
      const randomPassword = crypto.randomBytes(32).toString('hex');
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert([{
          full_name: name || username,
          username,
          email,
          password: hashedPassword,
          gender: "male",
          profile_pic: picture || `https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${encodeURIComponent(username)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`,
          is_email_verified: true,
          google_id: googleId,
          is_username_set: false,
        }])
        .select()
        .single();

      if (insertError) {
        logger.error("Error creating Google OAuth user", { error: insertError.message });
        return res.status(500).json({ error: "Failed to create account" });
      }

      user = newUser;
    }

    // Generate tokens
    const accessToken = generateTokens(user.id, user.role || "user", res);

    // Audit log
    await supabase.from('audit_logs').insert([{
      user_id: user.id,
      action: "LOGIN",
      ip_address: req.ip,
      user_agent: req.headers["user-agent"],
      details: "Google OAuth login",
    }]);

    res.status(200).json({
      _id: user.id,
      fullName: user.full_name,
      username: user.username,
      email: user.email,
      profilePic: user.profile_pic,
      role: user.role || "user",
      isBanned: user.is_banned || false,
      isEmailVerified: user.is_email_verified || true,
      isUsernameSet: user.is_username_set ?? true,
      accessToken,
    });
  } catch (error) {
    logger.error("Error in googleAuth controller", { error: error.message });
    if (error.message?.includes("Token used too late") || error.message?.includes("Invalid token")) {
      return res.status(401).json({ error: "Invalid or expired Google token" });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const setUsername = async (req, res) => {
  try {
    const { newUsername } = req.body;
    const userId = req.user.id || req.user._id;

    if (!newUsername || newUsername.trim().length < 3) {
      return res.status(400).json({ error: "Username must be at least 3 characters long." });
    }

    const trimmedUsername = newUsername.trim();

    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .ilike('username', trimmedUsername)
      .neq('id', userId)
      .maybeSingle();

    if (existingUser) {
      return res.status(400).json({ error: "Username already taken." });
    }

    const { error: updateError } = await supabase
      .from('users')
      .update({
        username: trimmedUsername,
        is_username_set: true,
      })
      .eq('id', userId);

    if (updateError) {
      if (updateError.code === '23505') {
        return res.status(400).json({ error: "Username already taken." });
      }
      logger.error("Error updating username", { error: updateError.message });
      return res.status(500).json({ error: "Failed to update username." });
    }

    // Fetch the full user so we can broadcast to other clients
    const { data: updatedUser } = await supabase
      .from('users')
      .select('id, full_name, username, profile_pic')
      .eq('id', userId)
      .single();

    if (updatedUser) {
      io.emit("newUserJoined", {
        _id: updatedUser.id,
        fullName: updatedUser.full_name,
        username: updatedUser.username,
        profilePic: updatedUser.profile_pic,
        isGroup: false,
      });
    }

    res.status(200).json({ message: "Username updated successfully.", username: trimmedUsername });
  } catch (error) {
    logger.error("Error in setUsername controller", { error: error.message });
    res.status(500).json({ error: "Internal Server Error" });
  }
};

