import logo from "../images/Livello 1 copia.png"


function Footer (){
    return(
            <div className="container-fluid">
                <hr class="hr5"/> 
                <div className="row footer-section">
                <div className="col link-utili  align-self-center  d-flex justify-content-center">
                    <h2>Link Utili</h2>
                    <span>Home</span><span>Eventi</span><span>Orechestra</span>
                    <span>Bando Direzione 2022</span><span>Contatti</span>
                </div>
                <div className="col  align-self-center d-flex justify-content-center social-icon">
                <i className="ri-facebook-fill"></i>
                <i className="ri-instagram-line"></i>
                <i className="ri-youtube-line"></i>
                <i className="ri-mail-line"></i>
                </div>
                <div className="col align-self-center d-flex justify-content-center">
                    <img src={logo} width="250" id="logo-ludi"/>
                </div>
                </div>
            </div>
    )
}

export default Footer