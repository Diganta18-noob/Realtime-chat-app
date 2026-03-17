import User from "../models/user.model.js";

const checkBanned = async (req, res, next) => {
  try {
    if (req.user && req.user.isBanned) {
      // Lazy auto-unban: check if bannedUntil has passed
      if (req.user.bannedUntil && new Date(req.user.bannedUntil) < new Date()) {
        // Suspension expired — auto-unban
        await User.findByIdAndUpdate(req.user._id, {
          isBanned: false,
          bannedUntil: null,
          banReason: "",
        });
        // Update req.user so downstream middleware/controllers see the change
        req.user.isBanned = false;
        req.user.bannedUntil = null;
        req.user.banReason = "";
        return next();
      }

      return res.status(403).json({
        error: "Your account has been restricted by an administrator.",
      });
    }
    next();
  } catch (error) {
    console.log("Error in checkBanned middleware:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default checkBanned;
