import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "./token";
import { db } from "../../database/connection";
import bcrypt from "bcrypt";

export async function refreshTokenController(req:Request,res:Response){
    // const {refreshToken}=req.body;

    // if(!refreshToken) return res.status(401).json({message:"Token de atualização não fornecido"});
    const refreshToken=req.cookies.refreshToken;

    if(!refreshToken) return res.status(401).json({message:"token de atualização não fornecido!"});

    try{
          const payload = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET as string
    ) as any;

        const [rows]:any=await db.query("select * from refresh_tokens where user_id=? and token=? and expires_at > NOW()",[payload.id,refreshToken]);
        const userRefreshToken=rows[0];
        const [userRows]:any= await db.query("select * from usuarios where id=?",[payload.id]);
        const user=userRows[0];
        

        if(!user){return res.status(403).json({message:" Usuário não encontrado"})}
        if(!userRefreshToken){
            return res.status(403).json({message:"Refresh token inválido"});
        }
        
        const newRefreshToken= generateRefreshToken(user,res);
        const refreshTokenHash= await bcrypt.hash(newRefreshToken.token,10);
        const connection = await db.getConnection();

        try{
            await connection.beginTransaction();

            await connection.query("DELETE FROM refresh_tokens where id=?",[userRefreshToken.id])

            await connection.query(`insert into refresh_tokens (user_id, token, expires_at, created_at) values (?,?,?,?)`,[user.id,refreshTokenHash,newRefreshToken.expires_at,newRefreshToken.created_at])
            
            await connection.commit();
        }catch(error) {

            await connection.rollback();
            return res.status(500).json({message:"erro ao guardar o token"})
        }finally{
            connection.release();
        }

        const token=newRefreshToken.token
        res.cookie("refreshToken",token,{
        httpOnly:true,
        secure: process.env.NODE_ENV==="production",
        sameSite:"strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        const newAccessToken = generateAccessToken(user);
        res.json({ accessToken: newAccessToken });

    }catch (err) {
    return res.sendStatus(403);
    }
}