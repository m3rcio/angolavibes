import React from "react";
import './InputBuscar.css';
type InputBuscarProps = {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  onBuscar:()=>void;
};

const InputBuscar: React.FC<InputBuscarProps> = ({
  value,
  onChange,
  onBuscar,
  placeholder = "Pesquisar em Luanda..."
}) => {

  return (
   <input
  type="text"
  value={value}
  className="input-buscar"
  onChange={(e) => onChange(e.target.value)}
  placeholder={placeholder}
  style={{
    padding: "20px 120px 20px 20px", // espaço para o botão à direita
    borderRadius: "32px",
    border: "none",
    width: "100%"
  }}
/>

  );
};

export default InputBuscar;
