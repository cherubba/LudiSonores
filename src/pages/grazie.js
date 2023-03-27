import Footer from "../components.js/Footer";
import Navbar from "../components.js/Navbar";
import logo from "../images/Livello 1 copia.png"

function Grazie(){

    return(
        <>
        <Navbar/>
        <div className="bg-contatti" data-aos="fade-up">
        <img src={logo} className="ludi-logo" alt="ludisonoreslogo"/>
        <h1 id="pagina-chisiamo-title">Grazie! Verrai presto contattato per maggiori informazioni</h1>
        </div>
        <Footer/>
        
        </>
    )
}

export default Grazie