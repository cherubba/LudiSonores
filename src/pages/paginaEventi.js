import React from "react"
import Navbar from "../components.js/Navbar"
import Eventi from "../components.js/Eventi"
import logo from "../images/Livello 1 copia.png"
import Footer from "../components.js/Footer"

function PaginaEventi () {

    return(
        <>
            <div className="pagina-eventi-bg"> 
            <Navbar />
            <div>
            <img src={logo} className="ludi-logo" alt="ludisonoreslogo"/>
            <div className="text-center eventi-section-2"><h2 id="eventi-title">Eventi</h2></div>
            </div>
            </div>
            <Eventi />
            <Footer />
               
            

    </>
    )
}

export default PaginaEventi