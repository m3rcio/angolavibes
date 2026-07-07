import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { Response } from "express";
dotenv.config();

export function generateAccessToken(user:{ id: string; email: string }) {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_ACCESS_SECRET as string,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN as jwt.SignOptions["expiresIn"]}
  );
}

export function generateRefreshToken(user:{ id: string; email: string },res:Response) {
  const token= jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH_SECRET as string,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN as jwt.SignOptions["expiresIn"]}
  );

  res.cookie("refreshToken", token,{
    httpOnly:true,
    secure: process.env.NODE_ENV==="production",
    sameSite:"strict",
    maxAge:  60 * 1000
    // maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
}


