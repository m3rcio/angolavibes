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
         <div className='descobrir-div'>

        <BotaoBuscar onBuscar={handleBuscar}/>
        <InputBuscar value={texto} onChange={setTexto} onBuscar={handleBuscar}/> 
       
      </div>
    )
 }
 
export default Descobrir