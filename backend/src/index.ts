import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// import userRoutes from "./routes/usuario.routes";

dotenv.config();

const app=express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// app.use("/api/users", userRoutes);

app.get("/", (req, res)=>{
    res.send("API RODANDO...");
});

app.listen(PORT,()=>{
    console.log(`aplicativo rodando na porta: ${PORT}`);
})