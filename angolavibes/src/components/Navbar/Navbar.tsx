import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

type NavbarProps = {
  onLoginClick: () => void;
  onSignupClick: () => void;
  onLogoutClick: ()=> void;
};


export default function Navbar({onLoginClick,onSignupClick}:NavbarProps){

const {user,logout} = useAuth();

    return(
      <nav className="navbar">
          {user ? (
            <>
            <div className="navbar-logo">
        <span>Angolavibes</span>
      </div>

      <ul className="navbar-links">
        <li><a href="#">Descobrir</a></li>
        <li><a href="#">Avaliar</a></li>
        <li><a href="#">Mais</a></li>
      </ul>

      
      <div className="navbar-actions">
        <span className="navbar-username">Olá, {user.nome}</span>
        <button className="btn-signup" onClick={logout}>Logout</button>
      </div>
    
     
    </>
  ) : ( 
    <>
    
       <div className="navbar-logo">
        <span>Angolavibes</span>
      </div>

      <ul className="navbar-links">
        <li><a href="#">Descobrir</a></li>
        <li><a href="#">Avaliar</a></li>
        <li><a href="#">Mais</a></li>
      </ul>

     
      <div className="navbar-actions">
        <button type="button"className="btn-login" onClick={onLoginClick}>Login</button>
        <button className="btn-signup" onClick={onSignupClick}>Sign Up</button>
      </div>
    </>)} </nav>
    )
}