import "./Navbar.css";


export default function Navbar(){
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
        <button className="btn-login">Login</button>
        <button className="btn-signup">Sign Up</button>
      </div>
    </nav>
    )
}