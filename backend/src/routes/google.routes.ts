import axios from "axios";
import { Router } from "express";
import { db } from "../database/connection";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { Lugar } from "../models/Lugar.model";
const googleRoutes=Router();

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

function mapCategoria(types: string[]): number {
  if (!types) return 2;
  if (types.includes("museum") || types.includes("tourist_attraction")) return 1;
  if (types.includes("park") || types.includes("amusement_park")) return 2;
  if (types.includes("restaurant") || types.includes("cafe") || types.includes("bar")) return 3;
  if (types.includes("lodging")) return 4;
  if (types.includes("natural_feature")) return 5;
  if (types.includes("shopping_mall")) return 6;
  if (types.includes("stadium") || types.includes("gym")) return 7;
  return 2;
}

function formatTime(hour?: number, minute?: number) {
  if (hour === undefined || minute === undefined) return null;
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00`;
}

googleRoutes.get("/places", async (req, res) => {
  try {
    const { query, categoria, pageToken } = req.query;

    const body: any = {
      textQuery: `${query || ""} em Luanda`,
      maxResultCount: 20
    };
    if (pageToken) body.pageToken = pageToken;

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

    const lugares = response.data.places || [];

    for (const place of lugares) {
      const categoria_id = categoria ? Number(categoria) : mapCategoria(place.types);
      const openPeriod = place.regularOpeningHours?.periods?.[0];

      const horario_abertura = formatTime(openPeriod?.open?.hour, openPeriod?.open?.minute);
      const horario_fechamento = formatTime(openPeriod?.close?.hour, openPeriod?.close?.minute);

      // 1️⃣ Verifica se o lugar já existe
      const [existing] = await db.query<RowDataPacket[]>(
        "SELECT id FROM lugares WHERE google_place_id = ?",
        [place.id]
      );

      let lugarIdInterno: number;
      if (existing.length > 0) {
        lugarIdInterno = existing[0].id;
      } else {
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

      // 2️⃣ Inserir imagens (limitadas a 5)
      if (place.photos?.length) {
        const fotosLimitadas = place.photos.slice(0, 5);
        for (const photo of fotosLimitadas) {
          const photoReference = photo.name.split("/").pop(); // pega só o PHOTO_REFERENCE
          const urlCompleta = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${photoReference}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
          await db.execute(
            `INSERT INTO lugar_imagens (lugar_id, imagem_url)
             VALUES (?, ?)
             ON DUPLICATE KEY UPDATE imagem_url = VALUES(imagem_url)`,
            [lugarIdInterno, urlCompleta]
          );
        }
      }
    }

    // 3️⃣ Buscar lugares com imagens
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
    `);

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

export default googleRoutes;