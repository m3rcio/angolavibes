import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";

// import userRoutes from "./routes/usuario.routes";

dotenv.config();

const app=express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// app.use("/api/users", userRoutes);
app.use("/api/auth",authRoutes)
app.get("/", (req, res)=>{
    res.send("API RODANDO...");
});

app.listen(PORT,()=>{
    console.log(`aplicativo rodando na porta: ${PORT}`);
})