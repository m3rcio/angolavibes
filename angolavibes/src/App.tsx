import './App.css'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Descobrir from './pages/Descobrir/Descobrir'

function App() {
  return (
    <>
    <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Descobrir/>} /> 
        <Route path="/login" element={<Login />} />
      </Routes>
     
    </>
  )
}

export default App
