import iconL from "../images/Group 7.png";
import iconR from "../images/Group 1.png";

function BandoButton() {
  return (
    <>
      <div className="bandobutton-section">
        <img src={iconL} alt="logo" width="150" className="ludiL" />
        {/*<button className="bando-button">
          <a class="link-style" href="/eventi/primer">
            Prossimo Concerto: {"\n"} Primer - Duo Doulov-Pogosyan
          </a>
        </button>*/}
        <button className="bando-button">
          <a class="link-style" href="/bandoMasterclassViolino2024">
            Nuovo Bando Masterclass Violino 2024
          </a>
          <i class="ri-file-text-line"></i>
        </button>
        <img src={iconR} alt="logo" width="150" className="ludiL" />
      </div>
      <hr class="hr5" />
    </>
  );
}

export default BandoButton;
