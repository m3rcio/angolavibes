import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

export function generateAccessToken(user:{ id: string; email: string }) {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_ACCESS_SECRET as string,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN as jwt.SignOptions["expiresIn"]}
  );
}

export function generateRefreshToken(user:{ id: string; email: string }) {
  return jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH_SECRET as string,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN as jwt.SignOptions["expiresIn"]}
  );
}


