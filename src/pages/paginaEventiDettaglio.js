import database from "../database.json"
import {useParams} from "react-router-dom"
import Navbar from "../components.js/Navbar"
import Footer from "../components.js/Footer"
import { useEffect } from "react"

function PaginaEventiDettaglio (){

    useEffect(() => {
        window.scrollTo(0, 0); // scrolla all'inizio della pagina quando il componente viene montato
      }, []);

    const {slug} = useParams()
    const thisEvent = database.find(el => el.slug === slug)
    const thisEventTrack = thisEvent.repertoire.map(el=>{
        return <p>{el}</p>
    })
    return(
        <>
            <div className="bg-evento" style={{backgroundImage: `url(https://drive.google.com/uc?id=${thisEvent.imageID})`}}> 
            <Navbar />
            </div>
            <div className="text-center eventi-section-2">
                <h2 className="section-title" id="evento-title">{thisEvent.name}</h2>
                <h3 className="text-center" id="event-date">{thisEvent.date}</h3>
                </div>
                <h2 className="text-center programma">Programma</h2>
            <div className="repertorio">
                {thisEventTrack}

            <a href="mailto:info@ludisonores.com?subject=Info e Prenotazione&body=Salve, vorrei maggiori informazioni riguardo lo spettacolo ed eventualmente prenotare un posto... "><button className="prenota-button">Richiedi Info e Prenotazione per lo spettacolo</button></a>
            </div>
            

            <Footer />
        </>
    )
}

export default PaginaEventiDettaglio