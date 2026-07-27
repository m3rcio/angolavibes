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


export function generateRefreshToken(user:{ id: string; email: string }) {

  const expires_at = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const created_at = new Date();

  const token= jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH_SECRET as string,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN as jwt.SignOptions["expiresIn"]}
  );

  return {token,expires_at,created_at};
}




