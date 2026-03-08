import './App.css'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Descobrir, { type Lugar } from './pages/Descobrir/Descobrir'
import { useState } from 'react'
import LoginModal from './components/LoginModal/LoginModal'
import SignupModal from './components/SignupModal/SignupModal'
import { lugarCategoriaMock } from './data/LugarCategoriaMock'
import CardLugar from './components/CardLugar/CardLugar'
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios'


function App() {
  const [loginOpen,setLoginOpen]=useState(false);
  const [signupOpen,setSignupOpen]=useState(false);
  const [lugares, setLugares] = useState<Lugar[]>([]);
  const [loading,setLoading]= useState(false);

   function onLoginClick() {
    setLoginOpen(true);
  }

  function closeLogin() {
    setLoginOpen(false);
  }

   function onSignupClick() {
    setSignupOpen(true);
  }

  function closeSignup() {
    setSignupOpen(false);
  }

  function onLogoutClick() {
  }

  function limparBusca(){
    setLugares([])
  }

  async function realizarBusca(termo: string) {
  if (!termo.trim()) return;

  try {
    setLoading(true)
    setLugares([]); 
    const response = await axios.get('http://localhost:5000/api/places', {
      params: { query: termo }
    });
    
    const lugaresComImagens = response.data.map((lugar: Lugar) => ({
      ...lugar,
      imagens: lugar.imagens?.length ? lugar.imagens : []
    }));
    
    
    setLugares(lugaresComImagens);
  } catch (error) {
    console.error("Erro na busca:", error);
  }finally {
    setLoading(false); 
  }
}
  return (
    <>
  <Navbar
    onLoginClick={onLoginClick}
    onSignupClick={onSignupClick}
    onLogoutClick={onLogoutClick}
  />

  <section className="hero">
    <Routes>
      <Route path="/" element={<Descobrir onBuscar={realizarBusca} />} />
    </Routes>
  </section>

 <section className="content">
  
{loading ? 

(<div className="loader-container">
      <div className="spinner"></div>
    </div>
  ) : (lugares.length > 0 ? <div className="container">
    <div className="header-resultados">
        <h2>Resultados encontrados</h2>
        <button className="btn-voltar" onClick={limparBusca}>
          ← Voltar para categorias
        </button>
      </div>
        {lugares.map((lugar) => (
          <CardLugar key={lugar.google_place_id} lugar={lugar} />
        ))}
      </div> : lugarCategoriaMock.map((local) => (
    <div key={local.id} className="card" onClick={() => realizarBusca(local.nome)}>
      <img src={local.imagem} alt={local.nome} />
      <h2>{local.nome}</h2>
    </div>
  )))}

  {/* {lugares.length > 0 ? <div className="container">
        {lugares.map((lugar) => (
          <CardLugar key={lugar.google_place_id} lugar={lugar} />
        ))}
      </div> : lugarCategoriaMock.map((local) => (
    <div key={local.id} className="card" onClick={() => realizarBusca(local.nome)}>
      <img src={local.imagem} alt={local.nome} />
      <h2>{local.nome}</h2>
    </div>
  ))} */}
</section>

  <LoginModal isOpen={loginOpen} onClose={closeLogin} />
  <SignupModal isOpen={signupOpen} onClose={closeSignup} />
</>
  )
}

export default App
