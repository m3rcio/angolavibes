import axios from "axios";
import { Router } from "express";
import { db } from "../database/connection";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { Lugar } from "../models/Lugar.model";
import { mapCategoria } from "./utils/mapCategoria";
import { formatTime } from "./utils/formatLugarTime";
import { validarBusca } from "../validator/lugarQuery.validator";

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


 export async function buscarLugares((req, res) => {
  try {
    const { query, categoria, pageToken } = req.query;
// lógica para validar query e categoria vem aqui
const isQueryValid=validarBusca(query);

if(isQueryValid.isValid==true){

}
    const body: any = { 
      textQuery: `${query || ""} em Luanda`,
      maxResultCount: 20
    };
    if (pageToken) body.pageToken = pageToken;


    // faz a busca ao google pelos lugares com base no body{} que contem o query, categoria e pageToken
    const response = await axios.post(
      "https://places.googleapis.com/v1/places:searchText",
      body,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": process.env.GOOGLE_MAPS_API_KEY,
          "X-Goog-FieldMask":
            "places.id,places.displayName,places.formattedAddress,places.location,places.nationalPhoneNumber,places.priceLevel,places.regularOpeningHours,places.types,places.photos,nextPageToken,places.websiteUri"
        }
      }
    );

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

   // mostrar lugares atravez da busca
    const [rows] = await db.query<LugarJoinRow[]>(`
      SELECT 
        l.id,
        l.nome,
        l.descricao,
        l.google_place_id,
        l.endereco,
        l.latitude,
        l.longitude,
        l.telefone,
        l.preco_medio,
        li.imagem_url
      FROM lugares l
      LEFT JOIN lugar_imagens li 
        ON li.lugar_id = l.id
        WHERE l.nome LIKE ?
        `, [`%${query}%`]);

    const lugaresMap = new Map<number, any>();
    rows.forEach((row) => {
      if (!lugaresMap.has(row.id)) {
        lugaresMap.set(row.id, {
          id: row.id,
          nome: row.nome,
          descricao: row.descricao,
          google_place_id: row.google_place_id,
          endereco: row.endereco,
          latitude: row.latitude,
          longitude: row.longitude,
          telefone: row.telefone,
          preco_medio: row.preco_medio,
          imagens: []
        });
      }

      if (row.imagem_url) {
        lugaresMap.get(row.id).imagens.push(row.imagem_url);
      }
    });

    const lugaresJoin = Array.from(lugaresMap.values());
    res.json(lugaresJoin);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar lugares" });
  }
});
