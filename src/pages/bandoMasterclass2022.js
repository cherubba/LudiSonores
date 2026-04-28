
import Footer from "../components.js/Footer"
import Navbar from "../components.js/Navbar"

const pdf = `${process.env.PUBLIC_URL}/bandi/bandomasterclass22.pdf`;

function BandoMasterclass2022 () {
    return(
        <>
        <Navbar />
        <h2 className="text-center mobile-button bando-title" >Scarica qui il nuovo Bando</h2>
        <div className="container pdf-file" data-aos="fade-up">
        <div className="button-wrapper mobile-button">
        <a href={pdf}  download="bando2022.pdf"><button id="masterclass-btn-mobile">Nuovo Bando Masterclass 2022 <i className="ri-file-text-line"></i></button></a>
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