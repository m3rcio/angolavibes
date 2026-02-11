import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { db } from "../database/connection";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


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

        if(rows.length>0){
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

export async function login(req:Request,res:Response){
    const {email,senha}=req.body;

    if(!email || !senha){
        return res.status(400).json({message:"Dados obrigatórios em falta!"})
    }

    try{
    const [rows]: any = await db.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );

    if (!rows || rows.length === 0) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const user = rows[0];

    const passwordMatch = await bcrypt.compare(senha, user.senha);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    return res.json({
      token,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        tipo: user.tipo,
        foto: user.foto,
      },
    });
    }catch(error){}
}

export async function googleAuth(req: any, res: any) {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();

    if (!payload?.email) {
      return res.status(401).json({ message: "Token inválido" });
    }

    const { email, name, picture } = payload;

    // verificar se usuário já existe
    const [rows]: any = await db.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );

    let userId;

    if (rows.length === 0) {
      const [result]: any = await db.query(
        "INSERT INTO usuarios (nome, email, senha, foto) VALUES (?, ?, ?, ?)",
        [name, email, "google_oauth", picture]
      );
      userId = result.insertId;
    } else {
      userId = rows[0].id;
    }

    // gerar JWT
    const jwtToken = jwt.sign(
      { id: userId, email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return res.json({ token: jwtToken });

  } catch (err) {
    return res.status(401).json({ message: "Falha na autenticação Google" });
  }
}
