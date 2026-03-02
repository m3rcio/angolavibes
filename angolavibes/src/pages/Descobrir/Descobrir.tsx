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
  setLugares: React.Dispatch<React.SetStateAction<Lugar[]>>;
}

 function Descobrir({ setLugares}: Props){
  const [texto, setTexto] = useState('');

  async function buscarLugares() {
    if(!texto.trim()) return;

    try{
      const response= await axios.get('http://localhost:5000/api/places', {
  params: {
    query: texto
  }
});
      console.log(response.data);
      setLugares(response.data.lugares);
    }catch(error){
      console.error(error);
      console.log(error);
    }
  }

   function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      buscarLugares();
    }
  }

 
    return(
         <div className="descobrir-div">
  <div className="input-wrapper">
    <InputBuscar value={texto} onChange={setTexto} 
     onBuscar={buscarLugares} />
    <BotaoBuscar onBuscar={buscarLugares} />
  </div>
  
</div>
    )
 }
 
export default Descobrir