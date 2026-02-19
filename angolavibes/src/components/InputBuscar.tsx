import React from "react";

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
  placeholder = "Buscar..."
}) => {
     function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      onBuscar();
    }
  }
  return (
   <input
  type="text"
  value={value}
  onChange={(e) => onChange(e.target.value)}
  onKeyDown={handleKeyDown}
  placeholder={placeholder}
  style={{
    padding: "15px 120px 15px 20px", // espaço para o botão à direita
    borderRadius: "32px",
    border: "2px solid #8b8b8b",
    width: "100%"
  }}
/>

  );
};

export default InputBuscar;
