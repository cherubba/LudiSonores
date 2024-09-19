import Footer from "../components.js/Footer";
import Navbar from "../components.js/Navbar";
import pdf from "../Bando_Masterclass_Arte_scenica_2024.pdf";
import BandoButton from "../components.js/BandoButton";

function BandoMasterclassArteScenica2024() {
  return (
    <>
      <Navbar />
      <h2 className="text-center mobile-button bando-title">
        Scarica qui il nuovo Bando
      </h2>
      <div className="container pdf-file" data-aos="fade-up">
        <div className="button-wrapper mobile-button">
          <a href={pdf} download="Bando_Masterclass_Arte_scenica_2024">
            <button id="masterclass-btn-mobile">
              Nuovo Bando Masterclass di Arte Scenica 2024{" "}
              <i class="ri-file-text-line"></i>
            </button>
          </a>
        </div>
        <iframe title="BandoMasterclassArteScenica2024" src={pdf}></iframe>
      </div>

      <Footer />
    </>
  );
}

export default BandoMasterclassArteScenica2024;
