import React from "react";
import "./LugarCategoriaCard.css";
import { LugarCategoria } from "../../models/LugarCategoria";


type LugarCategoriaCardProps = {
  categoria: LugarCategoria;
};

export function LugarCategoriaCard({categoria: LugarCategoriaCardProps}: LugarCategoriaCardProps) {
    return (
      <div className="lugar-categoria-card">
        <img src={LugarCategoriaCardProps.foto} alt={LugarCategoriaCardProps.titulo} />
        <h3>{LugarCategoriaCardProps.titulo}</h3>
      </div>
    );
 }