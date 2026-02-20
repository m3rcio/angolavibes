import './App.css'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Descobrir from './pages/Descobrir/Descobrir'
import { useState } from 'react'
import LoginModal from './components/LoginModal/LoginModal'
import SignupModal from './components/SignupModal/SignupModal'
import { lugarCategoriaMock } from './data/LugarCategoriaMock'

function App() {
  const [loginOpen,setLoginOpen]=useState(false);
  const [signupOpen,setSignupOpen]=useState(false);
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
      <Route path="/" element={<Descobrir />} />
    </Routes>
  </section>

 <section className="content">
  {lugarCategoriaMock.map((local) => (
    <div key={local.id} className="card">
      <img src={local.imagem} alt={local.nome} />
      <h3>{local.nome}</h3>
      <p>{local.nome}</p>
    </div>
  ))}
</section>

  <LoginModal isOpen={loginOpen} onClose={closeLogin} />
  <SignupModal isOpen={signupOpen} onClose={closeSignup} />
</>
  )
}

export default App
