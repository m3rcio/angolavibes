import { useContext, useState } from "react";
import "./LoginModal.css";
import { GoogleLogin } from "@react-oauth/google";
import { handleGoogleLogin } from "../../hooks/handleGoogleLogin";
import { AuthContext } from "../../context/AuthContext";
import api from "../../services/api";

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // chamada ao backend
      const response = await api.post("http://localhost:5000/api/auth/login",{ email, senha });


      if (response.status !== 200) throw new Error(response.data.message);

      // salva usuário no contexto
      login({ nome: response.data.user.nome });

      // 🔥 LIMPAR CAMPOS
      setEmail("");
      setSenha("");

      // opcional: fechar modal
      // closeModal()

    } catch (err) {
      console.error(err);
    }
  };

   return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <h1>Entrar</h1>
        <p className="login-text">
          Por continuar, você concorda com nossos{" "}
          <a href="#">Termos de Serviço</a> e reconhece nossa{" "}
          <a href="#">Política de Privacidade</a>.
        </p>

        <GoogleLogin
          onSuccess={(credentialResponse) => {
            handleGoogleLogin(credentialResponse.credential);
            onClose();
          }}
          onError={() => {
            console.log("Login Google falhou");
          }}
        />

        <button className="social-btn facebook">
          <span className="icon">f</span>
          Continuar com Facebook
        </button>

        <div className="divider">----- ou -----</div>

        <input
          type="email"
          placeholder="Email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="login-input"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        {error && <p className="error-text">{error}</p>}

        <button className="btn-entrar" onClick={handleLogin} disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>

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