import { useContext, useState } from "react";
import "./SignupModal.css";
import { GoogleLogin } from "@react-oauth/google";
import { handleGoogleLogin } from "../../hooks/handleGoogleLogin";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
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
const {signup} = useContext(AuthContext);  
  async function handleSignup() {
    setError("");

    if (!nome || !email || !senha) {
      setError("Preencha todos os campos!");
      return;
    }

    setLoading(true);

    try {
     await signup(nome,email,senha);


      if (response.status != 200) {
        setError(response.data.message || "Erro ao criar conta");
        return;
      }

      alert("Conta criada com sucesso!");
      setError("Conta criada com sucesso!");
      setNome("");
      setEmail("");
      setSenha("");
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

        <GoogleLogin
  onSuccess={credentialResponse => {
    handleGoogleLogin(credentialResponse.credential);
  }}
  onError={() => {
    console.log("Login Google falhou");
  }}
/>

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
