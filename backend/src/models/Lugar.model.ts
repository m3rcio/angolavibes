import { RowDataPacket } from "mysql2";

export interface Lugar {
  id: number;
  nome: string;
  descricao: string | null;
  google_place_id: string;
  endereco: string;
  latitude: number | null;
  longitude: number | null;
  telefone: string;
  preco_medio: number | null;
}

export interface idRow extends RowDataPacket{
  id:number;
}