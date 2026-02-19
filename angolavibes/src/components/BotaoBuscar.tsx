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
        padding: "13px 16px",
        cursor: loading ? "not-allowed" : "pointer",
        backgroundColor:"#f73b3b",
        color:'#fff', 
        marginTop:'250px',
      }}
    >
      {loading ? "Buscando..." : "Buscar"}
    </button>
    );
};

export default BotaoBuscar;