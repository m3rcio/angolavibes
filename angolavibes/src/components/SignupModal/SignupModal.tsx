import "./SignupModal.css";

type SignupModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SignupModal({ isOpen, onClose }: SignupModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="signup-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <h1>Criar conta</h1>

        <p className="signup-text">
          Ao continuar, você concorda com nossos{" "}
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

        <button className="social-btn ">
          <span className="icon">f</span>
          Continuar com Email
        </button>

        <div className="divider">----- ou -----</div>

        <input
          type="text"
          placeholder="Nome"
          className="signup-input"
        />

        <input
          type="email"
          placeholder="Email"
          className="signup-input"
        />

        <input
          type="password"
          placeholder="Senha"
          className="signup-input"
        />

        <button className="btn-criar">Criar conta</button>

        <p className="login-redirect">
          Já tem conta? <a href="#">Entrar</a>
        </p>
      </div>
    </div>
  );
}
