import "./../App.css";
import Header from "./../components.js/HeaderMain";
import BandoButton from "./../components.js/BandoButton";
import Eventi from "./../components.js/Eventi";
import ChiSiamo from "./../components.js/ChiSiamo";
import Masterclass22 from "./../components.js/Masterclass22";
import Footer from "./../components.js/Footer";
import MasterclassViolino24 from "../components.js/MasterclassViolino24";

function PaginaMain() {
  return (
    <div data-aos="fade-up">
      <Header />
      <MasterclassViolino24 />
      <BandoButton />

      <div className="text-center eventi-section" data-aos="fade-up">
        <h2 className="section-title" id="eventi-title">
          Eventi
        </h2>
      </div>
      <Eventi />
      <ChiSiamo />

      <Footer />
    </div>
  );
}

export default PaginaMain;
