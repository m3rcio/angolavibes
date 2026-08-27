import { buscarLugarnoGoogle } from "./googlePlaces.service";


   
  export async function buscarLugar(query:string,categoria:number,pageToken:number){
        const body:any= { 
      textQuery: `${query || ""} em Luanda`,
      maxResultCount: 20
    };
    if (pageToken) body.pageToken = pageToken;
       const googleResults= await buscarLugarnoGoogle(body)
       const lugaresExistentes= await lugaresExistentesPorIds(googleResults)
       const novosLugares= googleResults

    }
    