import axios from "axios";

   export async function buscarLugarnoGoogle(body:any){
         // faz a busca ao google pelos lugares com base no body{} que contem o query, categoria e pageToken
         try{
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
    if(response.status !== 200){
      throw new Error(` Erro inesperado: ${response.status}`)
    }
    return response.data;

         }catch(error){
        console.error(error);
         }
    }
