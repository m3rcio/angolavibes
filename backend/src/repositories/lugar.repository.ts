// armazena os lugares em uma constante ou se estiver vazio uma array vazio
import { RowDataPacket } from "mysql2";
import { Lugar} from "../models/Lugar.model";      
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

export async function lugaresExistentesPorIds(lugares){
     // Verifica se o lugar já existe
for (const place of lugares){
    
          const [existing] = await db.query<RowDataPacket[]>(
            "SELECT id FROM lugares WHERE google_place_id = ?",
            [place.id]
          );
        }
        return [existing];

}

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