import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: number;
  email: string;
  iat?: number;
  exp?: number;
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"] as string | undefined;
  if (!authHeader) return res.status(401).json({ message: "Token não fornecido" });

  const parts = authHeader.split(" ");
  if (parts.length !== 2) return res.status(401).json({ message: "Token inválido" });

  const scheme = parts[0];
  const token = parts[1];

  if (!/^Bearer$/i.test(scheme)) return res.status(401).json({ message: "Formato de token inválido" });

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT_SECRET não definido");
      return res.status(500).json({ message: "Configuração do servidor inválida" });
    }

    const payload = jwt.verify(token, secret) as JwtPayload;
    req.user = { id: payload.id, email: payload.email, iat: payload.iat, exp: payload.exp };
    return next();
  } catch (err:any) {
    if(err.name==="TokenExpiredError"){
        return res.status(401).json({ message: "Token expirado" });
    }

    return res.status(403).json({ message: "Token inválido" });
  }
}

export default authenticateToken;
