import { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import { db } from "../database/connection";

const app=Router();

     app.post('/lugar/favoritar', async (req,res) =>{
        try{
            const {place}=req.body;
            const response = await db.execute(`INSERT INTO favoritos values (criado_em, lugar_id, usuario_id) values (?, ?, ?)`, [
            new Date(),
            place.lugar_id,
            place.usuario_id,
          ])

          res.json(response)
        }catch(error){
            console.error(error);
            res.status(500).json({error:"erro ao buscar lugares"})
        }
     })