import pdf from "../bandomasterclass22.pdf"

function Masterclass22() {
  return (
    <>
    <div className="container-fluid" data-aos="fade-up">
      <div className="row bgimagemasterclass d-flex justify-content-end align-items-center">
            <h2 className="masterclass-title text-center">Masterclass Direzione 2022</h2>
        <div className="col-6">
          <p id="masterclass-para">
            L'associazione Ludi Sonores presenta la seconda edizione della
            masterclass di direzione d'orchestra del M° Marcello Bufalini. I
            partecipanti lavoreranno con un'orchestra dal vivo affiancati da un
            grande didatta della direzione d'orchestra.
          </p>
          <a href={pdf}  download="bando2022.pdf"><button id="masterclass-btn">Nuovo Bando Masterclass 2022 <i class="ri-file-text-line"></i></button></a>
        </div>
      </div>
    </div>
    </>
  );
}

export default Masterclass22;
