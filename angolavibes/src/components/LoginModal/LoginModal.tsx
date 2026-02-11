import { useState } from "react";
import "./LoginModal.css";
import { GoogleLogin } from "@react-oauth/google";
import { handleGoogleLogin } from "../../hooks/handleGoogleLogin";

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  async function handleLogin() {
    setError("");

    if (!email || !senha) {
      setError("Preencha todos os campos!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Erro ao fazer login");
        return;
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      alert("Login realizado com sucesso!");
      setEmail("");
      setSenha("");
      onClose();
    } catch (err) {
      setError("Erro de conexão com o servidor");
    } finally {
      setLoading(false);
    }
  }

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