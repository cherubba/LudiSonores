import Footer from "../components.js/Footer"
import Navbar from "../components.js/Navbar"
import logo from "../images/Livello 1 copia.png"

function Contatti () {
    return (
        <>
        
        <div className="bg-evento">
        <Navbar />
        <img src={logo} className="ludi-logo" alt="ludisonoreslogo"/>
        <h1 id="pagina-chisiamo-title">Contatti</h1>
      
        </div>
        <div className="container text-center form-div">
            {/* <div class="form-contattaci">
            <h1>Invia un Messaggio</h1>
            <form action="" class="form-section">
            <form action="/action_page.php" method="POST">
                <div class="form1">
                <label for="fname"></label><br />
                <input
                    type="text"
                    id="fname"
                    name="fname"
                    value=""
                    placeholder="Il tuo Nome"
                /><br /><br />
                <label for="lname"></label><br />
                <input
                    type="text"
                    id="lname"
                    name="lname"
                    value=""
                    placeholder="Il tuo Congome"
                /><br /><br />
                </div>
                <div class="form2">
                <label for="email"></label><br />
                <input
                    type="text"
                    id="email"
                    name="email"
                    value=""
                    placeholder="La tua Email"
                /><br /><br />
                <label for="telefono"></label><br />
                <input
                    type="text"
                    id="telefono"
                    name="telefono"
                    value=""
                    placeholder="Il tuo telefono"
                /><br /><br />
                </div>
                <div class="form3">
                <label for="oggetto"></label><br />
                <input
                    type="text"
                    id="oggetto"
                    name="oggetto"
                    value=""
                    placeholder="Oggetto Messaggio"
                /><br /><br />
                <label for="messaggio"></label><br />
                <textarea
                    name="messaggio"
                    form="usrform"
                    placeholder="Il tuo Messaggio"
                ></textarea>
                <br /><br />
                </div>
                <div>
                    <input type="checkbox" id="policy" name="policy" value="policy"/>
                    <label for="policy">Accetto le condizioni di utilizzo del sito e l’informativa sul trattamento dei dati personali.</label><br/>
                </div>
                <input type="submit" value="INVIA" id="submit-bottom" />
            </form>
            </form>
        </div> */}
        <p className="info-para">Richiesta Informazioni</p>
        <a href='mailto:info@ludisonores.com?subject=Richiesta Informazioni LudiSonores'><button id="btn-preven-btn">info@ludisonores.com</button></a>
        </div>
        <Footer />
        
        
        
        </>

    )
}

export default Contatti