import jwt from "jsonwebtoken";

const generateTokens = (userID, res) => {
  const accessToken = jwt.sign({ userID }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
  
  const refreshToken = jwt.sign({ userID }, process.env.JWT_REFRESH_SECRET, {
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
