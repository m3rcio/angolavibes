import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BotaoBuscar from './components/BotaoBuscar'
import InputBuscar from './components/InputBuscar'

function App() {

  let [nome, setNome] = useState('')
  let [texto,setTexto]= useState('')
    function handleBuscar() {
    console.log("Buscar por:", texto);
  }
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">

        <input type='text' placeholder='nome' value={nome} onChange={(e)=>setNome(e.target.value)}></input>
        <BotaoBuscar onBuscar={() => alert(nome)} />
        <InputBuscar value={texto} onChange={setTexto} onBuscar={handleBuscar}/> 
       
      </div>
    </>
  )
}

export default App
