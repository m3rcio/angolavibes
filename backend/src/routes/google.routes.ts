import axios from "axios";
import { Router } from "express";
const googleRoutes=Router();

export default googleRoutes;

googleRoutes.get("/places", async (req, res) => {
  try {
    const { query } = req.query;

    const response = await axios.post(
      "https://places.googleapis.com/v1/places:searchText",
      {
        textQuery: query,
        includedTypes: [
          "restaurant",
          "cafe",
          "bar",
          "tourist_attraction",
          "museum",
          "park",
          "shopping_mall",
          "lodging",
          "stadium"
        ],
        maxResultCount: 20
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": process.env.GOOGLE_API_KEY,
          "X-Goog-FieldMask":
            "places.displayName,places.formattedAddress,places.location,places.nationalPhoneNumber,places.priceLevel,places.regularOpeningHours,places.photos,place.websiteUri,place.rating"
        }
      }
    );

    const lugares = response.data.places.map((place: any) => ({
      nome: place.displayName?.text || "",
      descricao: "",
      endereco: place.formattedAddress || "",
      latitude: place.location?.latitude || null,
      longitude: place.location?.longitude || null,
      telefone: place.nationalPhoneNumber || "",
      preco_medio: place.priceLevel || null,
      horario_abertura:
        place.regularOpeningHours?.periods?.[0]?.open?.hour || null,
      horario_fechamento:
        place.regularOpeningHours?.periods?.[0]?.close?.hour || null,
      categoria_id: 1, // você pode mapear dinamicamente
      imagem: place.phtos || "",
      website: place.websiteUri || "",
      avaliacao: place.rating || null
    }));

    res.json(lugares);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar lugares" });
  }
});