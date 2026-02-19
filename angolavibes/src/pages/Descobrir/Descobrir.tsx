import { useState } from 'react'
import './Descobrir.css'
import BotaoBuscar from '../../components/BotaoBuscar';
import InputBuscar from '../../components/InputBuscar';
 
 function Descobrir(){
      const [texto,setTexto]= useState('')
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