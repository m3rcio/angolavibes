import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "./token";
import { db } from "../../database/connection";

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

        const [rows]:any=await db.query("select * from refresh_tokens where user_id=? and token=?",[payload.id,refreshToken]);
        const userRefreshToken=rows[0];
        const [userRows]:any= await db.query("select * from usuarios where id=?",[payload.id]);
        const user=userRows[0];
        

        if(!user){return res.status(403).json({message:""})}
        if(!userRefreshToken || userRefreshToken.token !== refreshToken){
            return res.status(403).json({message:"Refresh token inválido"});
        }
        
        // await db.query("delete from refresh_tokens where id=?",[userRefreshToken.id])
        const newAccessToken = generateAccessToken(user);
        const newRefreshToken= generateRefreshToken(user,res);
        // await db.query("START TRANSACTION; delete from refresh_tokens where id=?  insert into refresh_tokens (user_id,token,expires_at,created_at) values (?,?,?,?) commit; rollback ;",[userRefreshToken.id,user.id,newRefreshToken.token,newRefreshToken.expires_at,newRefreshToken.created_at]);

        const connection = await db.getConnection();

        try{
            await connection.beginTransaction();

            await connection.query("DELETE FROM refresh_tokens where id=?",[userRefreshToken.id])

            await connection.query(`insert into refresh_tokens (user_id, token, expires_at, created_at) values (?,?,?,?)`,[user.id,newRefreshToken.token,newRefreshToken.expires_at,newRefreshToken.created_at])

            await connection.commit();
        }catch {
            
        }
        res.json({ accessToken: newAccessToken });

    }catch (err) {
    return res.sendStatus(403);
    }
}