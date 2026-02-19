import React from "react";
import "./LugarCategoriaCard.css";
import type { LugarCategoria } from "../../models/LugarCategoria";


type LugarCategoriaCardProps = {
  categoria: LugarCategoria;
};

export function LugarCategoriaCard({categoria: LugarCategoriaCardProps}: LugarCategoriaCardProps) {
    return (
      <div className="lugar-categoria-card">
        <img src={LugarCategoriaCardProps.imagem} alt={LugarCategoriaCardProps.nome} />
        <h3>{LugarCategoriaCardProps.nome}</h3>
      </div>
    );
 }