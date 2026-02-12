import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { generateAccessToken } from "./token";
import { db } from "../../database/connection";

export async function refreshTokenController(req:Request,res:Response){
    const {refreshToken}=req.body;

    if(!refreshToken) return res.status(401).json({message:"Token de atualização não fornecido"});

    try{
          const payload = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET as string
    ) as any;

        const [rows]:any=await db.query("select * from usuarios where id=?",[payload.id]);
        const user=rows[0];
        
        if(!user || user.refreshToken !== refreshToken){
            return res.status(403).json({message:"Refresh token inválido"});
        }

        const newAccessToken = generateAccessToken(user);

        res.json({ accessToken: newAccessToken });

    }catch (err) {
    return res.sendStatus(403);
    }
}