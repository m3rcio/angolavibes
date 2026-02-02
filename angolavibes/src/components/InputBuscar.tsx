import React from "react";

type InputBuscarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const InputBuscar: React.FC<InputBuscarProps> = ({
  value,
  onChange,
  placeholder = "Buscar..."
}) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
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
