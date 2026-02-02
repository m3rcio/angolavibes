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
        padding: "8px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        outline: "none"
      }}
    />
  );
};

export default InputBuscar;
