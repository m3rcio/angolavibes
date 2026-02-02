import { useState } from 'react'
import './App.css'
import BotaoBuscar from './components/BotaoBuscar'
import InputBuscar from './components/InputBuscar'
import Navbar from './components/Navbar/Navbar'

function App() {

  let [nome, setNome] = useState('')
  let [texto,setTexto]= useState('')
    function handleBuscar() {
    console.log("Buscar por:", texto);
  }
  return (
    <>
    <Navbar></Navbar>
      <div className="card">

        <BotaoBuscar onBuscar={() => alert(nome)} />
        <InputBuscar value={texto} onChange={setTexto} onBuscar={handleBuscar}/> 
       
      </div>
    </>
  )
}

export default App
