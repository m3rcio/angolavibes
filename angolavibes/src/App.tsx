import './App.css'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Descobrir from './pages/Descobrir/Descobrir'
import { useState } from 'react'
import LoginModal from './components/LoginModal/LoginModal'

function App() {
  const [loginOpen,setLoginOpen]=useState(false);
   function onLoginClick() {
    setLoginOpen(true);
  }

  function closeLogin() {
    setLoginOpen(false);
  }
  return (
    <>
    <Navbar onLoginClick={onLoginClick}></Navbar>
      <Routes>
        <Route path="/" element={<Descobrir/>} /> 
        <Route path="/login" element={<Login />} />
      </Routes>
      <LoginModal
        isOpen={loginOpen}
        onClose={closeLogin}
      />
    </>
  )
}

export default App
