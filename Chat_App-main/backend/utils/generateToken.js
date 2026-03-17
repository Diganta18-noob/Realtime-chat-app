import jwt from "jsonwebtoken";

const generateTokens = (userID, role, res) => {
  const accessToken = jwt.sign({ userID, role }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
  
  const refreshSecret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
  const refreshToken = jwt.sign({ userID, role }, refreshSecret, {
    expiresIn: "7d",
  });

  res.cookie("refreshToken", refreshToken, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });

  return accessToken;
};

export default generateTokens;
