
import Footer from "../components.js/Footer"
import Navbar from "../components.js/Navbar"
import pdf from "../bandomasterclass22.pdf"
import BandoButton from "../components.js/BandoButton"

function BandoMasterclass2022 () {
    return(
        <>
        <Navbar />
        <h2 className="text-center mobile-button bando-title" >Scarica qui il nuovo Bando</h2>
        <div className="container pdf-file" data-aos="fade-up">
        <div className="button-wrapper mobile-button">
        <BandoButton />
        </div>
        <iframe
        title="Bando Masterclass 2022"
        src={pdf}
        >
        </iframe>
        </div>
        
        <Footer />
        </>
    )
}

export default BandoMasterclass2022