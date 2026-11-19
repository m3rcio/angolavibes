import { buscarLugarnoGoogle } from "./googlePlaces.service";
import type { Lugar } from "../models/Lugar.model";
import { inserirLugares, lugaresExistentesPorIds } from "../repositories/lugar.repository";
import { RowDataPacket } from "mysql2";
import { mapCategoria } from "../controllers/utils/mapCategoria";
import { formatTime } from "../controllers/utils/formatLugarTime";

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


   
  export async function buscarLugar(query:string,categoria:string,pageToken:string){
        const body:any= { 
      textQuery: `${query || ""} em Luanda`,
      maxResultCount: 20
    };
    if (pageToken) body.pageToken = pageToken;
       const googleResults= await buscarLugarnoGoogle(body)
       const lugaresExistentes= await lugaresExistentesPorIds(googleResults) 
       const idsExistentes = new Set(lugaresExistentes.map((e) => e.google_place_id));
       const novosLugares= googleResults.filter((l:Lugar)=> !idsExistentes.has(l.id))
       const mapaIds = new Map(
  lugaresExistentes.map((e) => [e.google_place_id, e.id])
);
       if(novosLugares.length > 0){
        
        for(const place of novosLugares){
           const categoria_id = categoria ? Number(categoria) : mapCategoria(place.types);
           const openPeriod = place.regularOpeningHours?.periods?.[0];
    
           const horario_abertura = formatTime(openPeriod?.open?.hour, openPeriod?.open?.minute);
           const horario_fechamento = formatTime(openPeriod?.close?.hour, openPeriod?.close?.minute);
           await inserirLugares(place,categoria_id,horario_abertura,horario_fechamento);
  
           const lugarId= await inserirLugares(place,categoria_id,horario_abertura,horario_fechamento);
           await inserirImagensLugar(lugarId,montarUrlsFotos(place))
        }
       }

       return {lugaresExistentes,novosLugares}

    }

    function montarUrlsFotos(lugar:any):string[]{
      if (!lugar.imagem_url?.length) return [];

      return lugar.photos.slice(0,5).map((photo:any)=>{
        const photoReference = photo.name.split("/").pop();
        return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${photoReference}&key=${process.env.GOOGLE_MAPS_API_KEY}`
      })
    }

   function agruparLugares(rows: LugarJoinRow[]) {
  const mapa = new Map<number, any>();

  for (const row of rows) {
    if (!mapa.has(row.id)) {
      mapa.set(row.id, {
        id: row.id,
        nome: row.nome,
        descricao: row.descricao,
        google_place_id: row.google_place_id,
        endereco: row.endereco,
        latitude: row.latitude,
        longitude: row.longitude,
        telefone: row.telefone,
        preco_medio: row.preco_medio,
        imagens: [],
      });
    }
    if (row.imagem_url) mapa.get(row.id).imagens.push(row.imagem_url);
  }

  return Array.from(mapa.values());
}
        
    