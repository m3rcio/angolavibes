import axios from "axios";
import { Router } from "express";
import { db } from "../database/connection";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { Lugar } from "../models/Lugar.model";
import { mapCategoria } from "./utils/mapCategoria";
import { formatTime } from "./utils/formatLugarTime";
import { validarBusca } from "../validator/lugarQuery.validator";
import { buscarLugar } from "../services/lugarQuery.service";

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


