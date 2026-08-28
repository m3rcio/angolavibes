import { buscarLugarnoGoogle } from "./googlePlaces.service";
import type { Lugar } from "../models/Lugar.model";
import { lugaresExistentesPorIds } from "../repositories/lugar.repository";

   
  export async function buscarLugar(query:string,categoria:number,pageToken:number){
        const body:any= { 
      textQuery: `${query || ""} em Luanda`,
      maxResultCount: 20
    };
    if (pageToken) body.pageToken = pageToken;
       const googleResults= await buscarLugarnoGoogle(body)
       const lugaresExistentes= await lugaresExistentesPorIds(googleResults)
       const novosLugares= googleResults.filter((l:Lugar)=> !lugaresExistentes.some((e:Lugar)=> e.id === l.id))

    }
    