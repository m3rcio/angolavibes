import axios from "axios";
import { Router } from "express";
const googleRoutes=Router();

export default googleRoutes;

googleRoutes.get('/api/angolavibes', async (req,res)=>{
    const {tipo}=req.query;
    const API_KEY=process.env.GOOGLE_MAPS_API_KEY;
    const url=`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-8.839987,13.289437&radius=5000&type=${tipo}&key=${API_KEY}`;

    try{
        const resposnse= await axios.get(url);
        res.json(resposnse.data.results);
    }catch(error){
        res.status(500).send("Erro ao buscar dados do Google");
    }
})