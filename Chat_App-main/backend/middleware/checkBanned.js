const checkBanned = (req, res, next) => {
  if (req.user && req.user.isBanned) {
    return res.status(403).json({
      error: "Your account has been restricted by an administrator.",
    });
  }
  next();
};

export default checkBanned;
