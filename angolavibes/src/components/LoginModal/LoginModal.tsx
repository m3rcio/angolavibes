import "./LoginModal.css";

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  if (!isOpen) return null;

   return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="login-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <h1>Entrar</h1>
        <p className="login-text">
          Por continuar, você concorda com nossos{" "}
          <a href="#">Termos de Serviço</a> e reconhece nossa{" "}
          <a href="#">Política de Privacidade</a>.
        </p>

        <button className="social-btn google">
          <span className="icon">G</span>
          Continuar com Google
        </button>

        <button className="social-btn facebook">
          <span className="icon">f</span>
          Continuar com Facebook
        </button>

        <div className="divider">----- ou -----</div>

        <input
          type="email"
          placeholder="Email"
          className="login-input"
        />

        <input
          type="password"
          placeholder="Senha"
          className="login-input"
        />

        <button className="btn-entrar">Entrar</button>

        <a href="#" className="login-link">
          Entre com link por email
        </a>

        <p className="signup-text">
          Ainda não tem conta? <a href="#">Cadastre-se</a>
        </p>
      </div>
    </div>
  );
}