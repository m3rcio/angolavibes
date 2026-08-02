import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "./token";
import { db } from "../../database/connection";
import { RowDataPacket } from "mysql2";

interface RefreshTokenRow extends RowDataPacket{
    id:number,
    user_id:number,
    token:string,
    expires_at: Date,
    created_at: Date
}
export async function refreshTokenController(req:Request,res:Response){

  
    const refreshToken=req.cookies.refreshToken;

    if(!refreshToken) return res.status(401).json({message:"token de atualização não fornecido!"});

    try{
          const payload = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET as string
    ) as any;

        
       
       
        

       
        
        
        const connection = await db.getConnection();
      
        try{
            await connection.beginTransaction();
        const [rows]= await connection.query<RefreshTokenRow[]>("select * from refresh_tokens where user_id=? and token=? and expires_at > NOW() FOR UPDATE",[payload.id,refreshToken]);
        const userRefreshToken=rows[0];
        const [userRows]:any= await connection.query("select * from usuarios where id=?",[payload.id]);
        const user=userRows[0];

         if(!user){
            await connection.rollback();
            return res.status(403).json({message:" Usuário não encontrado"})
        }
        if(!userRefreshToken){
            await connection.rollback();
            return res.status(403).json({message:"Refresh token inválido"});
        }

        const newRefreshToken=generateRefreshToken(user);
            await connection.query("DELETE FROM refresh_tokens where id=? ",[userRefreshToken.id])
            
            await connection.query(`insert into refresh_tokens (user_id, token, expires_at, created_at) values (?,?,?,?)`,[user.id,newRefreshToken.token,newRefreshToken.expires_at,newRefreshToken.created_at])
            
            await connection.commit();

              const token=newRefreshToken.token
        res.cookie("refreshToken",token,{
        httpOnly:true,
        secure: process.env.NODE_ENV==="production",
        sameSite:"strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        const newAccessToken = generateAccessToken(user);
        return res.json({ accessToken: newAccessToken });
        }catch(error) {

            await connection.rollback();
            return res.status(500).json({message:"erro ao guardar o token"})
        }finally{
            connection.release();
        }

    }catch (err) {
        if(typeof err === "object" && err !== null && "name" in err){
             if(err.name=='TokenExpiredError'){
       return res.status(401).json({message: 'token expirou'}) 
       }else if(err.name=="JsonWebTokenError"){
         return res.status(401).json({message: 'token inválido'}) 
       }else if(err.name=='NotBeforeError'){
          return res.status(401).json({message: 'token inválido'}) 
       }else {return res.status(500).json({message:'Erro do servidor'});}
        }else{
            return res.status(500).json({message:'Erro do servidor'});
        }
    }
}