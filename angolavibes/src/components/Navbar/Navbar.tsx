import "./Navbar.css";

type NavbarProps = {
  onLoginClick: () => void;
  onSignupClick: () => void;
};

export default function Navbar({onLoginClick,onSignupClick}:NavbarProps){

    return(
           <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <span>MeuApp</span>
      </div>

      {/* Links */}
      <ul className="navbar-links">
        <li><a href="#">Descobrir</a></li>
        <li><a href="#">Avaliar</a></li>
        <li><a href="#">Mais</a></li>
      </ul>

      {/* Ações */}
      <div className="navbar-actions">
        <button type="button"className="btn-login" onClick={onLoginClick}>Login</button>
        <button className="btn-signup" onClick={onSignupClick}>Sign Up</button>
      </div>
    </nav>
    )
}