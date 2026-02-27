import axios from "axios";
import { Router } from "express";
import { db } from "../database/connection";
const googleRoutes=Router();

export default googleRoutes;

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
    const nextPageToken = response.data.nextPageToken || null;

    for (const place of lugares) {
      const categoria_id = categoria
        ? Number(categoria)
        : mapCategoria(place.types);

      const openPeriod = place.regularOpeningHours?.periods?.[0];

      const horario_abertura = formatTime(
        openPeriod?.open?.hour,
        openPeriod?.open?.minute
      );

      const horario_fechamento = formatTime(
        openPeriod?.close?.hour,
        openPeriod?.close?.minute
      );

      let imagem = "";
      if (place.photos?.length) {
        imagem = `https://places.googleapis.com/v1/${place.photos[0].name}/media?maxHeightPx=400&key=${process.env.GOOGLE_API_KEY}`;
      }

      await db.execute(
        `INSERT INTO lugares
        (google_place_id, nome, endereco, latitude, longitude,
         telefone, preco_medio, horario_abertura, horario_fechamento,
         categoria_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ? )
        ON DUPLICATE KEY UPDATE
          google_place_id = VALUES(google_place_id),
          nome = VALUES(nome),
          endereco = VALUES(endereco),
          latitude = VALUES(latitude),
          longitude = VALUES(longitude),
          telefone = VALUES(telefone),
          preco_medio = VALUES(preco_medio),
          horario_abertura = VALUES(horario_abertura),
          horario_fechamento = VALUES(horario_fechamento),
          categoria_id = VALUES(categoria_id)
        `,
        [
          place.id,
          place.displayName?.text || "",
          "",
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

      const [rows]: any = await db.query(
  "SELECT id FROM lugares WHERE google_place_id = ?",
  [place.id]
    );

    const lugarIdInterno = rows[0].id;

    await db.execute(
  `INSERT INTO lugar_imagens (lugar_id, imagem_url)
   VALUES (?, ?)
   ON DUPLICATE KEY UPDATE imagem_url = VALUES(imagem_url)`,
  [lugarIdInterno, imagem]
);
    }

    const [rows] = await db.query("SELECT * FROM lugares");
    const [rowsImagens] = await db.query("SELECT * FROM lugar_imagens");
    res.json({ lugares: rows, imagens: rowsImagens });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar lugares" });
  }
});