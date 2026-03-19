import jwt from "jsonwebtoken";

const generateTokens = (userID, role, res) => {
  const accessToken = jwt.sign({ userID, role }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
  
  const refreshSecret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
  const refreshToken = jwt.sign({ userID, role }, refreshSecret, {
    // 24 hours absolute max, but typically expires on browser close
    expiresIn: "24h",
  });

  res.cookie("refreshToken", refreshToken, {
    // No maxAge creates a Session Cookie (expires when browser window is closed)
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });

  return accessToken;
};

export default generateTokens;
