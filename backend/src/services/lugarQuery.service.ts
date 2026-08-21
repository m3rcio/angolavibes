import { buscarLugarnoGoogle } from "./googlePlaces.service";


   
  export async function buscarLugar(query:string,categoria:number,pageToken:number){
        const body:any= { 
      textQuery: `${query || ""} em Luanda`,
      maxResultCount: 20
    };
    if (pageToken) body.pageToken = pageToken;
       const googleResponse= buscarLugarnoGoogle(body)

       
    }
    
    


   


        // armazena os lugares em uma constante ou se estiver vazio uma array vazio
        const lugares = response.data.places || [];
    
        for (const place of lugares) {
          const categoria_id = categoria ? Number(categoria) : mapCategoria(place.types);
          const openPeriod = place.regularOpeningHours?.periods?.[0];
    
          const horario_abertura = formatTime(openPeriod?.open?.hour, openPeriod?.open?.minute);
          const horario_fechamento = formatTime(openPeriod?.close?.hour, openPeriod?.close?.minute);
    
          // Verifica se o lugar já existe
          const [existing] = await db.query<RowDataPacket[]>(
            "SELECT id FROM lugares WHERE google_place_id = ?",
            [place.id]
          );
    
          let lugarIdInterno: number;
          if (existing.length > 0) {
            lugarIdInterno = existing[0].id;
          } else {
    
            // inserir lugar se não existir
            const [result] = await db.execute<ResultSetHeader>(
              `INSERT INTO lugares
                (google_place_id, nome, endereco, latitude, longitude,
                 telefone, preco_medio, horario_abertura, horario_fechamento,
                 categoria_id)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
              [
                place.id,
                place.displayName?.text || "",
                place.formattedAddress || "",
                place.location?.latitude || null,
                place.location?.longitude || null,
                place.nationalPhoneNumber || "",
                place.priceLevel || null,
                horario_abertura,
                horario_fechamento,
                categoria_id
              ]
            );
            lugarIdInterno = result.insertId;
          }
    
          if (place.photos?.length) {
            const fotosLimitadas = place.photos.slice(0, 5);
            for (const photo of fotosLimitadas) {
              const photoReference = photo.name.split("/").pop(); 
              const urlCompleta = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${photoReference}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
              // inserir imagens na tabela
              await db.execute(
                `INSERT INTO lugar_imagens (lugar_id, imagem_url)
                 VALUES (?, ?)
                 ON DUPLICATE KEY UPDATE imagem_url = VALUES(imagem_url)`,
                [lugarIdInterno, urlCompleta]
              );
            }
          }
        }