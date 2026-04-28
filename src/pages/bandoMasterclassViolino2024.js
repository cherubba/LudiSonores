import Footer from "../components.js/Footer";
import Navbar from "../components.js/Navbar";

const pdf = `${process.env.PUBLIC_URL}/bandi/Bando_Masterclass_Violino_Solista_2024.pdf`;

function BandoMasterclassViolino2024() {
  return (
    <>
      <Navbar />
      <h2 className="text-center mobile-button bando-title">
        Scarica qui il nuovo Bando
      </h2>
      <div className="container pdf-file" data-aos="fade-up">
        <div className="button-wrapper mobile-button">
          <a href={pdf} download="Bando_Masterclass_Violino_Solista_2024">
            <button id="masterclass-btn-mobile">
              Nuovo Bando Masterclass di Violino 2024{" "}
              <i className="ri-file-text-line"></i>
            </button>
          </a>
        </div>
        <iframe title="BandoMasterclassViolino2024" src={pdf}></iframe>
      </div>

      <Footer />
    </>
  );
}

export default BandoMasterclassViolino2024;
