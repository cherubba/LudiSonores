import iconL from "../images/Group 7.png"
import iconR from "../images/Group 1.png"



function BandoButton(){


    return(
        <>
        <div className="bandobutton-section" data-aos="fade-up">
            <img src={iconL} alt="logo" width="150" className="ludiL"/>
            <button className="bando-button" ><a  class="link-style" href="/eventi/EnglishStrings" >Prossimo Concerto: English Strings 23/04/2023 </a></button>
            <img src={iconR} alt="logo" width="150" className="ludiL"/>
        </div>
        <hr class="hr5"/> 
        </>
    )
}

export default BandoButton