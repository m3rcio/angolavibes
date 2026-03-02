import { useState } from "react";
import type { Lugar } from "../pages/Descobrir/Descobrir";
interface Props {
  lugar: Lugar;
}

export default function CardLugar({lugar}: Props){
    const [mostrarMapa,setMostrarMapa]=useState(false);

    const mapaUrl=`https://maps.googleapis.com/maps/api/staticmap?center=${lugar.latitude},${lugar.longitude}&zoom=15&size=600x300&markers=color:red%7C${lugar.latitude},${lugar.longitude}&key=${
    import.meta.env.VITE_GOOGLE_MAPS_KEY
  }`;

  return(
     <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "15px",
        width: "600px"
      }}
    >
      <div style={{ position: "relative" }}>
        <img
          src={mostrarMapa ? mapaUrl || "não deu mano" : lugar.imagens[0]}
          alt={lugar.nome}
          style={{ width: "100%", height: "300px", objectFit: "cover" }}
        />
        {/* {lugar.imagens?.map((img, index) => (
  <img key={index} src={img} alt={lugar.nome} />
        ))} */}

        <button
          onClick={() => setMostrarMapa(!mostrarMapa)}
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            padding: "6px 12px",
            cursor: "pointer"
          }}
        >
          {mostrarMapa ? "Ver Foto" : "Ver Mapa"}
        </button>
      </div>

       {lugar.imagens.length > 0 && (
        <img src={lugar.imagens[0]} alt={lugar.nome} />
      )}
      <h3>{lugar.nome}</h3>
      <p>{lugar.descricao}</p>
      <p>{lugar.endereco}</p>
      <p>{lugar.telefone}</p>
    </div>
  );
}