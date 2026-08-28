import { buscarLugarnoGoogle } from "./googlePlaces.service";
import type { Lugar } from "../models/Lugar.model";
import { lugaresExistentesPorIds } from "../repositories/lugar.repository";
import { RowDataPacket } from "mysql2";

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
   
  export async function buscarLugar(query:string,categoria:number,pageToken:number){
        const body:any= { 
      textQuery: `${query || ""} em Luanda`,
      maxResultCount: 20
    };
    if (pageToken) body.pageToken = pageToken;
       const googleResults= await buscarLugarnoGoogle(body)
       const lugaresExistentes= await lugaresExistentesPorIds(googleResults)
       const novosLugares= googleResults.filter((l:Lugar)=> !lugaresExistentes.some((e)=> e.id === l.id))

       if(novosLugares.length > 0){
        await inserirLugares(novosLugares);
       }

    }
    