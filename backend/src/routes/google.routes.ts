import axios from "axios";
import { Router } from "express";
import { db } from "../database/connection";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { Lugar } from "../models/Lugar.model";
const googleRoutes=Router();

googleRoutes.get("/places",buscarLugar);

export default googleRoutes;