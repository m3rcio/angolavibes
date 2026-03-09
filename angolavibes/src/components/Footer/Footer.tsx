export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#111",
        color: "#fff",
        padding: "40px 20px",
        marginTop: "60px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "30px",
        }}
      >
        {/* Logo / descrição */}
        <div>
          <h2 style={{ color: "#e63946" }}>AngolaVibes</h2>
          <p style={{ opacity: 0.8 }}>
            Descubra restaurantes, parques, ginásios e lugares incríveis em
            Luanda.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3>Explorar</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>Restaurantes</li>
            <li>Parques</li>
            <li>Ginásios</li>
            <li>Shopping</li>
          </ul>
        </div>

        {/* Redes sociais */}
        <div>
          <h3>Redes sociais</h3>
          <div style={{ display: "flex", gap: "15px", fontSize: "22px" }}>
            <i className="bi bi-instagram"></i>
            <i className="bi bi-facebook"></i>
            <i className="bi bi-twitter-x"></i>
            <i className="bi bi-youtube"></i>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div
        style={{
          borderTop: "1px solid #333",
          marginTop: "30px",
          paddingTop: "15px",
          textAlign: "center",
          fontSize: "14px",
          opacity: 0.7,
        }}
      >
        © {new Date().getFullYear()} AngolaVibes — Todos os direitos reservados
      </div>
    </footer>
  );
}