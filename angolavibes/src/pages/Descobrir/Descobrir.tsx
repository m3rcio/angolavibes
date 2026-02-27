import { useState } from 'react'
import './Descobrir.css'
import BotaoBuscar from '../../components/BotaoBuscar';
import InputBuscar from '../../components/InputBuscar';
import axios from "axios";
import CardLugar from '../../components/CardLugar';

export interface Lugar {
  google_place_id: string;
  nome: string;
  descricao: string;
  endereco: string;
  latitude: number;
  longitude: number;
  telefone: string;
  preco_medio: number;
  imagem: string;
}

 function Descobrir(){
  const [lugares, setLugares] = useState<Lugar[]>([]);
  const [texto, setTexto] = useState('');

  async function buscarLugares() {
    if(!texto.trim()) return;

    try{
      const response= await axios.get('http://localhost:3000/places', {
  params: {
    query: texto
  }
});
      console.log(response.data+" yup this is it");
      setLugares(response.data);
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
  <section style={{ display: "grid", gap: "20px", marginTop: "30px" }}>
        {lugares.map((lugar) => (
          <CardLugar key={lugar.google_place_id} lugar={lugar} />
        ))}
      </section>
</div>
    )
 }
 
export default Descobrir