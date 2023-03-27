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
                <h2 className="section-title" id="eventi-title">{thisEvent.name}</h2>
                <h3 className="text-center">{thisEvent.date}</h3>
                </div>
                <h2 className="text-center programma">Programma</h2>
            <div className="repertorio">
                {thisEventTrack}

            </div>
            

            <Footer />
        </>
    )
}

export default PaginaEventiDettaglio