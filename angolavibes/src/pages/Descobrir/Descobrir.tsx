import { useState } from 'react'
import './Descobrir.css'
import BotaoBuscar from '../../components/BotaoBuscar';
import InputBuscar from '../../components/InputBuscar';
 
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
  const [texto, setTexto] = useState("");

  async function buscarLugares() {
    if(!texto.trim()) return;

    try{
      const response= await axios.get(`http://localhost:5000/places?query=${texto}`);

      setLugares(response.data);
    }catch(error){
      console.error(error);
    }
  }

   function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      buscarLugares();
    }
  }

    function handleBuscar() {
    console.log("Buscar por:", texto);
  }
    return(
         <div className="descobrir-div">
  <div className="input-wrapper">
    <InputBuscar value={texto} onChange={setTexto} onBuscar={handleBuscar} />
    <BotaoBuscar onBuscar={handleBuscar} />
  </div>
</div>
    )
 }
 
export default Descobrir