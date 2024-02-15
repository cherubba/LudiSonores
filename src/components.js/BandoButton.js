import iconL from "../images/Group 7.png";
import iconR from "../images/Group 1.png";

function BandoButton() {
  return (
    <>
      <div className="bandobutton-section">
        <img src={iconL} alt="logo" width="150" className="ludiL" />
        <button className="bando-button">
          <a class="link-style" href="/eventi/primer">
            Prossimo Concerto: {"\n"} Primer - Duo Doulov-Pogosyan - Stagione da
            Camera Ludi Sonores 15/02/2024{" "}
          </a>
        </button>
        <img src={iconR} alt="logo" width="150" className="ludiL" />
      </div>
      <hr class="hr5" />
    </>
  );
}

export default BandoButton;
