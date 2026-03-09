import { useState } from 'react'
import './Descobrir.css'
import BotaoBuscar from '../../components/BotaoBuscar';
import InputBuscar from '../../components/InputBuscar';
import axios from "axios";

export interface Lugar {
  google_place_id: string;
  nome: string;
  descricao: string;
  endereco: string;
  latitude: number;
  longitude: number;
  telefone: string;
  preco_medio: number;
  imagens: string[];
}


interface Props {
  onBuscar: (termo: string) => void; 
}

function Descobrir({ onBuscar }: Props) {
  const [texto, setTexto] = useState('');

  const iniciarBusca = () => onBuscar(texto);

  // function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
  //   if (e.key === "Enter") iniciarBusca();
  // }

  return (
    <div className="descobrir-div">
      <div className='text-background'>
        <h1>Aonde quer chegar?</h1>
      </div>
      <div className="input-wrapper">
        <InputBuscar 
          value={texto} 
          onChange={setTexto} 
          onBuscar={iniciarBusca} 
        />
        <BotaoBuscar onBuscar={iniciarBusca} />
      </div>
    </div>
  );
}
 
export default Descobrir