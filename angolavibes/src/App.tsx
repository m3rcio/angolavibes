import './App.css'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Descobrir from './pages/Descobrir/Descobrir'
import { useState } from 'react'
import LoginModal from './components/LoginModal/LoginModal'
import SignupModal from './components/SignupModal/SignupModal'

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
  return (
    <>
    <Navbar onLoginClick={onLoginClick} onSignupClick={onSignupClick}></Navbar>
      <Routes>
        <Route path="/" element={<Descobrir/>} /> 
        <Route path="/login" element={<Login />} />
      </Routes>
      <LoginModal
        isOpen={loginOpen}
        onClose={closeLogin}
      />
      <SignupModal
        isOpen={signupOpen}
        onClose={closeSignup}
      />
    </>
  )
}

export default App
