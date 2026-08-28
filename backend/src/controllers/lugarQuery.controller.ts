import axios from "axios";
import { Router } from "express";
import { db } from "../database/connection";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { Lugar } from "../models/Lugar.model";
import { mapCategoria } from "./utils/mapCategoria";
import { formatTime } from "./utils/formatLugarTime";
import { validarBusca } from "../validator/lugarQuery.validator";
import { buscarLugar } from "../services/lugarQuery.service";

interface LugarJoinRow extends RowDataPacket {
  id: number;
  nome: string;
  descricao: string | null;
  google_place_id: string;
  endereco: string;
  latitude: number | null;
  longitude: number | null;
  telefone: string;
  preco_medio: number | null;
  imagem_url: string | null;
}


//  export async function buscarLugares((req, res) => {
//   try {
//     const { query, categoria, pageToken } = req.query;
// // lógica para validar query e categoria vem aqui
// const isQueryValid=validarBusca(query);

// if(isQueryValid.isValid==true){
//   buscarLugar(query,categoria,pageToken)
// }
   
//    // mostrar lugares atravez da busca
//     const [rows] = await db.query<LugarJoinRow[]>(`
//       SELECT 
//         l.id,
//         l.nome,
//         l.descricao,
//         l.google_place_id,
//         l.endereco,
//         l.latitude,
//         l.longitude,
//         l.telefone,
//         l.preco_medio,
//         li.imagem_url
//       FROM lugares l
//       LEFT JOIN lugar_imagens li 
//         ON li.lugar_id = l.id
//         WHERE l.nome LIKE ?
//         `, [`%${query}%`]);

//     const lugaresMap = new Map<number, any>();
//     rows.forEach((row) => {
//       if (!lugaresMap.has(row.id)) {
//         lugaresMap.set(row.id, {
//           id: row.id,
//           nome: row.nome,
//           descricao: row.descricao,
//           google_place_id: row.google_place_id,
//           endereco: row.endereco,
//           latitude: row.latitude,
//           longitude: row.longitude,
//           telefone: row.telefone,
//           preco_medio: row.preco_medio,
//           imagens: []
//         });
//       }

//       if (row.imagem_url) {
//         lugaresMap.get(row.id).imagens.push(row.imagem_url);
//       }
//     });

//     const lugaresJoin = Array.from(lugaresMap.values());
//     res.json(lugaresJoin);

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Erro ao buscar lugares" });
//   }
// });
