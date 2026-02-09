import { useState } from "react";
import "./SignupModal.css";

type SignupModalProps = {
  isOpen: boolean;
  onClose: () => void;
};



export default function SignupModal({ isOpen, onClose }: SignupModalProps) {
const [nome,setNome]=useState("");
const [email,setEmail]=useState("");
const [senha,setSenha]=useState("");
const [loading,setLoading]=useState(false);
const [error,setError]=useState("");
  
  
  async function handleSignup() {
    setError("");

    if (!nome || !email || !senha) {
      setError("Preencha todos os campos");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nome,
          email,
          senha
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Erro ao criar conta");
        return;
      }

      alert("Conta criada com sucesso");
      
    } catch (err) {
      setError("Erro de conexão com o servidor");
    } finally {
      setLoading(false);
    }
  }
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
          className="signup-input" value={nome}
          onChange={(e)=>setNome(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="signup-input" value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="signup-input" value={senha}
          onChange={(e)=>setSenha(e.target.value)}
        />
        {error && <p className="error-text">{error}</p>}

        <button className="btn-criar" onClick={handleSignup}
        disabled={loading}>{loading ? "Criando..." : "Criar conta"}</button>
        
        <p className="login-redirect">
          Já tem conta? <a href="#">Entrar</a>
        </p>
      </div>
    </div>
  );
}
