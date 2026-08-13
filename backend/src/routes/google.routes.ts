import axios from "axios";
import { Router } from "express";
import { db } from "../database/connection";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { Lugar } from "../models/Lugar.model";
const googleRoutes=Router();

googleRoutes.get("/places",buscarLugares);

export default googleRoutes;