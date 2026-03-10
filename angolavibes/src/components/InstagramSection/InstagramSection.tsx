import './InstagramSection.css';

export default function InstagramSection() {
  const imagens = [
    "assets/insta1.jpg",
    "assets/insta2.jpg",
    "assets/insta3.jpg",
    "assets/insta4.jpg",
    "assets/insta5.jpg",
    "assets/insta6.jpg",
    "assets/insta7.jpg",
  ];

  return (
    <section className="instagram-section">
      <h2>Siga nosso Instagram</h2>
      <p>@angolavibes</p>

      <div className="instagram-grid">
        <img src={imagens[0]} className="grande" />
        <img src={imagens[1]} />
        <img src={imagens[2]} />
        <img src={imagens[3]} className="alto" />
        <img src={imagens[4]} />
        <img src={imagens[5]} />
        <img src={imagens[6]} />
      </div>
    </section>
  );
}