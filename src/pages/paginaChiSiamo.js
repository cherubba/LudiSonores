import Footer from "../components.js/Footer";
import Navbar from "../components.js/Navbar";
import logo from "../images/Livello 1 copia.png"
import { useEffect } from "react"

function PaginaChiSiamo() {

  useEffect(() => {
    window.scrollTo(0, 0); // scrolla all'inizio della pagina quando il componente viene montato
  }, []);

  return (
    <>
        <Navbar />
      <div className="pagina-chisiamo-bg" data-aos="fade-up">
        <img src={logo} className="ludi-logo" alt="ludisonoreslogo"/>
        <div className="text-center eventi-section-2"><h2 id="eventi-title">Chi siamo</h2></div>
      </div>
      <div>
        <p id="pagina-chisiamo-description">
          L'associazione Ludi Sonores nasce dal desiderio dei maestri Andrea
          Rossi e Claudio Aiello di creare una realtà musicale indipendente che
          abbia come obiettivo la valorizzazione e la divulgazione del grande
          repertorio sinfonico e operistico. Attraverso la collaborazione di
          giovani musicisti professionisti del territorio laziale e in
          particolare dei maestri Michele D'Orazio, Adelaide Pizzi e del Dott.
          Joshua De Loa, l'orchestra Ludi Sonores ha suscitato già dai suoi
          esordi grande interesse e ammirazione da parte del pubblico. La
          professionalità e il talento espresso nell' attività concertistica
          hanno valso il riconoscimento del M° Marcello Bufalini avviando un
          rapporto di collaborazione nelle Masterclass di direzione d'orchestra.
          Nonostante il difficile periodo dato dalla pandemia mondiale,
          l'associazione Ludi Sonores continua la sua attività mantenendo vivo
          il desiderio di fare musica insieme.
        </p>
      </div>
      <Footer />
    </>
  );
}

export default PaginaChiSiamo;
