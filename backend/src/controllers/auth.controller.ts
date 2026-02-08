import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { db } from "../database/connection";

export async function signup(req: Request,res:Response){
    const{nome,email,senha,tipo}=req.body;

    if(!nome || !email || !senha){
        return res.status(400).json({message:"Dados obrigatórios em falta!"})
    }

    if(senha.length < 4){
        return res.status(400).json({message:"senha fraca!"})
    }
    try{
        const[rows]:any=await db.query(
            "SELECT id from usuarios where email=?",[email]
        );

        if(rows-length>0){
            return res.status(409).json({ message: "Email já registrado" });
        }

        const senhaHash = await bcrypt.hash(senha, 10);

         await db.query(
      `INSERT INTO usuarios (nome, email, senha, tipo)
       VALUES (?, ?, ?, ?)`,
      [nome, email, senhaHash, tipo || "usuario"]
    );

    return res.status(201).json({message: "Usuário criado com sucesso"});

    }catch(error){
        console.error(error);
        return res.status(500).json({message: "Erro interno do servidor"});
    }
}
