import Navbar from "./Navbar";
import logo from "../images/Livello 1 copia.png"


function Header() {
  return (
    <>
    <header className="fluid-container">
      <div className="raw imagebg ">
        <div className="col">
          <Navbar />
        </div>
        <div className="col">
        <img src={logo} className="ludi-logo" alt="ludisonoreslogo"/>
        </div>
        <div className="col text-center header-frase">
          <h2>“la musica è come la vita, si può fare in un solo modo, insieme...”</h2>
          <p id="ezio-para">Ezio Bosso</p>
        </div>
      </div>
      
    </header>
  
    </>
  );
}

export default Header;
