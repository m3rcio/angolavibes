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
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Login</h2>

        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Senha" />

        <div className="modal-actions">
          <button onClick={onClose}>Cancelar</button>
          <button className="btn-primary">Entrar</button>
        </div>
      </div>
    </div>
  );
}