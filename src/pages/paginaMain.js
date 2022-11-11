import './../App.css';
import Header from './../components.js/Header'
import BandoButton from './../components.js/BandoButton'
import Eventi from './../components.js/Eventi'
import ChiSiamo from './../components.js/ChiSiamo'
import Masterclass22 from './../components.js/Masterclass22'
import Footer from './../components.js/Footer'



function PaginaMain () {
    return(
        <div data-aos="fade-up">
        <Header />
        <BandoButton />
        <div className="text-center eventi-section" data-aos="fade-up"><h2 className="section-title" id="eventi-title">Eventi</h2></div>
        <Eventi />
        <ChiSiamo />
        <Masterclass22 />
        <Footer />
      </div>
      
    )
}

export default PaginaMain