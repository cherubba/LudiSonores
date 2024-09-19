import pdf from "../Bando_Masterclass_Violino_Solista_2024.pdf";

function MasterclassViolino24() {
  return (
    <>
      <div className="container-fluid" data-aos="fade-up">
        <div className="row bgimagemasterclassviolino d-flex justify-content-end align-items-center">
          <h2 className="masterclass-title text-center">
            Masterclass Violino 2024
          </h2>
          <div className="col-5">
            <p id="masterclass-para">
              L'associazione Ludi Sonores è lieta di presentare la masterclass
              di Violino Solista del M° Misia Jannoni Sebastianini. La
              Masterclass si rivolge a tutti i musicisti interessati allo studio
              del violino, selezionati attraverso curriculum (studi e attività).
              Il programma dei brani da studiare durante il corso è scelto in
              modo da andare incontro agli interessi sia di allievi principianti
              che di allievi avanzati.
            </p>
            {/*<a href={pdf} download="Bando_Masterclass_Violino_Solista_2024.pdf">
              <button id="masterclass-btn">
                Nuovo Bando Masterclass Violino 2024{" "}
                <i class="ri-file-text-line"></i>
              </button>
            </a>*/}
          </div>
        </div>
      </div>
    </>
  );
}

export default MasterclassViolino24;
