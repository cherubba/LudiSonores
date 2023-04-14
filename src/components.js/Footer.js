import logo from "../images/Livello 1 copia.png"
import { Link } from "react-router-dom"

function Footer (){
    return(
            <div className="container-fluid footer-part">
                <hr class="hr5"/> 
                <div className="row footer-section">
                <div className="col link-utili  align-self-center  d-flex justify-content-center">
                    <h2>Link Utili</h2>
                    <span><Link to="/" class="nav-link ">Home</Link></span>
                    <span><Link to="/eventi" class="nav-link ">Eventi</Link></span>
                    <span><Link to="/chisiamo" class="nav-link ">Orchestra</Link></span>
                    {/*<span><Link to="/bandoMasterclass2022" class="nav-link ">bando Masterclass 2022</Link></span>*/}
                </div>
                <div className="col  align-self-center d-flex justify-content-center social-icon">
                <a href="https://www.facebook.com/ludisonores" class="nav-link " target={"_blank"}><i className="ri-facebook-fill"></i></a>
                <a href="https://www.instagram.com/ludisonores/" class="nav-link " target={"_blank"}><i className="ri-instagram-line"></i></a>
                <a href="https://www.youtube.com/@orchestraludisonores4566" class="nav-link " target={"_blank"}><i className="ri-youtube-line"></i></a>
                <a href="mailto:info@ludisonores.com?subject=Richiesta Informazioni LudiSonores'"class="nav-link " target={"_blank"} ><i className="ri-mail-line"></i></a>
                </div>
                <div className="col align-self-center d-flex justify-content-center">
                    <Link to="/"><img src={logo} width="250" id="logo-ludi"/></Link>
                </div>
                <h4 className="text-center footer-end">2023 Associazione Ludi Sonores C.F 96495580589 All Rights reserved.</h4>
                </div>
            </div>
    )
}

export default Footer