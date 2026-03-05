import './App.css'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Descobrir, { type Lugar } from './pages/Descobrir/Descobrir'
import { useState } from 'react'
import LoginModal from './components/LoginModal/LoginModal'
import SignupModal from './components/SignupModal/SignupModal'
import { lugarCategoriaMock } from './data/LugarCategoriaMock'
import CardLugar from './components/CardLugar/CardLugar'



function App() {
  const [loginOpen,setLoginOpen]=useState(false);
  const [signupOpen,setSignupOpen]=useState(false);
  const [lugares, setLugares] = useState<Lugar[]>([]);

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

  return (
    <>
  <Navbar
    onLoginClick={onLoginClick}
    onSignupClick={onSignupClick}
    onLogoutClick={onLogoutClick}
  />

  <section className="hero">
    <Routes>
      <Route path="/" element={<Descobrir setLugares={setLugares} />} />
    </Routes>
  </section>

 <section className="content">
  {lugares.length > 0 ? <div className="container">
        {lugares.map((lugar) => (
          <CardLugar key={lugar.google_place_id} lugar={lugar} />
        ))}
      </div> : lugarCategoriaMock.map((local) => (
    <div key={local.id} className="card">
      <img src={local.imagem} alt={local.nome} />
      <h3>{local.nome}</h3>
    </div>
  ))}
</section>

  <LoginModal isOpen={loginOpen} onClose={closeLogin} />
  <SignupModal isOpen={signupOpen} onClose={closeSignup} />
</>
  )
}

export default App
