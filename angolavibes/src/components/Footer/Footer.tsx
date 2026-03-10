export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#f12d2d",
        color: "#fff",
        padding: "50px 20px",
        marginTop: "60px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "40px",
        }}
      >
        {/* Logo / descrição */}
        <div>
          <h2 style={{ marginBottom: "10px" }}>AngolaVibes</h2>
          <p style={{ opacity: 0.9, lineHeight: "1.5" }}>
            Descubra restaurantes, parques, ginásios e lugares incríveis em
            Luanda. Explore novas experiências e aproveite o melhor da cidade.
          </p>
        </div>

        {/* Explorar */}
        <div>
          <h3 style={{ marginBottom: "10px" }}>Explorar</h3>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              lineHeight: "2",
              cursor: "pointer",
            }}
          >
            <li>Restaurantes</li>
            <li>Parques</li>
            <li>Ginásios</li>
            <li>Shopping</li>
            <li>Praias</li>
          </ul>
        </div>

        {/* Links úteis */}
        <div>
          <h3 style={{ marginBottom: "10px" }}>Links úteis</h3>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              lineHeight: "2",
              cursor: "pointer",
            }}
          >
            <li>Sobre nós</li>
            <li>Contato</li>
            <li>Política de privacidade</li>
            <li>Termos de uso</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 style={{ marginBottom: "10px" }}>Receba novidades</h3>
          <p style={{ fontSize: "14px", opacity: 0.9 }}>
            Receba dicas de lugares e novidades em Luanda.
          </p>

          <div
            style={{
              display: "flex",
              marginTop: "10px",
            }}
          >
            <input
              type="email"
              placeholder="Seu email"
              style={{
                padding: "8px",
                border: "none",
                borderRadius: "4px 0 0 4px",
                outline: "none",
                flex: 1,
              }}
            />
            <button
              style={{
                padding: "8px 14px",
                border: "none",
                backgroundColor: "#000",
                color: "#fff",
                borderRadius: "0 4px 4px 0",
                cursor: "pointer",
              }}
            >
              Enviar
            </button>
          </div>
        </div>
      </div>

      {/* redes sociais */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "40px",
          fontSize: "22px",
        }}
      >
        <i className="bi bi-instagram" style={{ cursor: "pointer" }}></i>
        <i className="bi bi-facebook" style={{ cursor: "pointer" }}></i>
        <i className="bi bi-twitter-x" style={{ cursor: "pointer" }}></i>
        <i className="bi bi-youtube" style={{ cursor: "pointer" }}></i>
      </div>

      {/* Copyright */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.3)",
          marginTop: "30px",
          paddingTop: "15px",
          textAlign: "center",
          fontSize: "14px",
          opacity: 0.9,
        }}
      >
        © {new Date().getFullYear()} AngolaVibes — Todos os direitos reservados
      </div>
    </footer>
  );
}