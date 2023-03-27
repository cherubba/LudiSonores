import Footer from "../components.js/Footer"
import Navbar from "../components.js/Navbar"
import logo from "../images/Livello 1 copia.png"
import { useState } from "react"

function Contatti () {

    const [nome, setNome]= useState("")
    const [cognome, setCognome]= useState("")
    const [email, setEmail]= useState("")
    const [telefono, setTelefono]= useState("")
    const [oggetto, setOggetto] = useState("")
    const [messaggio, setMessaggio]= useState("")
    const [privacy, setPrivacy] = useState(true)


    return (
        <>
        
        <Navbar />
        <div className="bg-contatti" data-aos="fade-up">
        <img src={logo} className="ludi-logo" alt="ludisonoreslogo"/>
        <h1 id="pagina-chisiamo-title">Contatti</h1>
      
        </div>
        <div className="container text-center form-div">
            <div class="form-contattaci">
            <h1>Invia un Messaggio</h1>
            <form action="https://formsubmit.co/registrazionivocalimarco@gmail.com" method="POST" >
                <div class="form1">
                <input type="hidden" name="_subject" value="Nuovo Messaggio!"/>
                <input type="hidden" name="_captcha" value="false"/>
                <input type="hidden" name="_next" value="https://ludisonores/grazie"></input>
                <label for="fname"></label><br />
                <input
                    type="text"
                    id="fname"
                    name="Nome"
                    value={nome}
                    placeholder="Il tuo Nome"
                    onChange={e=>setNome(e.target.value)}
                    required
                /><br /><br />
                <label for="lname"></label><br />
                <input
                    type="text"
                    id="lname"
                    name="Cognome"
                    value={cognome}
                    placeholder="Il tuo Congome"
                    onChange={e=>setCognome(e.target.value)}
                    required
                /><br /><br />
                </div>
                <div class="form2">
                <label for="email"></label><br />
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={email}
                    placeholder="La tua Email"
                    onChange={e=>setEmail(e.target.value)}
                    required
                /><br /><br />
                <label for="telefono"></label><br />
                <input
                    type="text"
                    id="telefono"
                    name="telefono"
                    value={telefono}
                    placeholder="Il tuo telefono"
                    onChange={e=>setTelefono(e.target.value)}
                    required
                /><br /><br />
                </div>
                <div class="form3">
                <label for="oggetto"></label><br />
                <input
                    type="text"
                    id="oggetto"
                    name="oggetto"
                    value={oggetto}
                    placeholder="Oggetto Messaggio"
                    onChange={e=>setOggetto(e.target.value)}
                    required
                /><br /><br />
                <label for="messaggio"></label><br />
                <textarea
                    type="text"
                    name="messaggio"
                    placeholder="Il tuo Messaggio"
                    value={messaggio}
                    onChange={e=>setMessaggio(e.target.value)}
                    required
                ></textarea>
                <br /><br />
                </div>
                <div>
                    <input type="checkbox" id="policy" name="check-policy" value="checked" onChange={e=>setPrivacy(prev=>!prev)}/>
                    <label for="policy">Accetto le condizioni di utilizzo del sito e l'informativa sul trattamento dei dati personali.</label><br/>
                </div>
                <button type="submit" value="INVIA" id="submit-bottom" disabled={privacy}  >Invia </button>
            </form>
        </div>
       
        </div>
        <Footer />
        
        
        
        </>

    )
}

export default Contatti