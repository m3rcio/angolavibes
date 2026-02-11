// utils/token.js
const jwt = require("jsonwebtoken");

export function generateAccessToken(user:{ _id: string; email: string }) {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
  );
}

export function generateRefreshToken(user:{ _id: string; email: string }) {
  return jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN }
  );
}


