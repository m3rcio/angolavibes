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
    position: "absolute",
    top: "50%",
    right: "6px",
    transform: "translateY(-50%)",
    padding: "10px 18px",
    cursor: loading ? "not-allowed" : "pointer",
    backgroundColor: "#f73b3b",
    color: "#880505",
    borderRadius: "32px",
    border: "none",
  }}
>
  {loading ? "Buscando..." : "Buscar"}
</button>

    );
};

export default BotaoBuscar;