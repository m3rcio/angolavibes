import { useState } from "react";
import type { Lugar } from "../../pages/Descobrir/Descobrir";
import "./CardLugar.css";
interface Props {
  lugar: Lugar;
}

export default function CardLugar({ lugar }: Props) {
  const [mostrarMapa, setMostrarMapa] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);

  const mapaUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lugar.latitude},${lugar.longitude}&zoom=15&size=600x300&markers=color:red%7C${lugar.latitude},${lugar.longitude}&key=${
    import.meta.env.VITE_GOOGLE_MAPS_KEY
  }`;
  
  const imagens = lugar.imagens?.length ? lugar.imagens : ["assets/placeholder.png"];
  const proximaImagem = () => setImgIndex((prev) => (prev + 1) % imagens.length);
  const imagemAnterior = () => setImgIndex((prev) => (prev - 1 + imagens.length) % imagens.length);
   return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "15px",
        width: "300px",
      }}
     
    >
      <div style={{ position: "relative" }}>
        <img
          src={mostrarMapa ? mapaUrl : imagens[imgIndex]}
          alt={lugar.nome}
          style={{
            width: "100%",
            height: "300px",
            objectFit: "cover",
            borderRadius: "4px",
          }}
        />

        {/* Botão de mapa */}
        <button
          onClick={() => setMostrarMapa(!mostrarMapa)}
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            padding: "6px 12px",
            cursor: "pointer",
            backgroundColor: "red",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
          }}
        >
          {mostrarMapa ? "Ver Foto" : "Ver Mapa"}
        </button>

        {/* Controles do carrossel, só aparecem quando não está mostrando o mapa */}
        {!mostrarMapa && imagens.length > 1 && (
          <>
            <button
              onClick={imagemAnterior}
              style={{
                position: "absolute",
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)",
                backgroundColor: "red",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                cursor: "pointer",
              }}
            >
              ‹
            </button>
            <button
              onClick={proximaImagem}
              style={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
                backgroundColor: "red",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                cursor: "pointer",
              }}
            >
              ›
            </button>
          </>
        )}
      </div>

      <h3>{lugar.nome}</h3>
      <p>{lugar.descricao}</p>
      <p>{lugar.endereco}</p>
      <p>{lugar.telefone}</p>
    </div>
  );
}