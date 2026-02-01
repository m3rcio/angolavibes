import React from "react";

type BotaoBuscarProps={
    onBuscar: ()=> void;
    loading?: boolean;
};

const BotaoBuscar: React.FC<BotaoBuscarProps>=({onBuscar,loading})=>{
    return(
         <button
      type="button"
      onClick={onBuscar}
      disabled={loading}
      style={{
        padding: "8px 16px",
        cursor: loading ? "not-allowed" : "pointer",
      }}
    >
      {loading ? "Buscando..." : "Buscar"}
    </button>
    );
};

export default BotaoBuscar;