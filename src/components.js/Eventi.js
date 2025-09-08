import { Link } from "react-router-dom";
import database from "../database.json";
import natale2024 from "../images/natale_opera_2024.jpg";
import quattroStagioni2 from "../images/quattro_stagioni_2.jpg";
import quattroStagioni from "../images/quattro_stagioni.jpg";

function Eventi() {
  const localImages = {
    natale_opera_2024_iv: natale2024,
    quattro_stagioni_2: quattroStagioni2,
    quattro_stagioni_domma_2025: quattroStagioni,
  };
  const cardElements = database.map((el) => {
    const imageSrc =
      localImages[el.imageID] ||
      `https://res.cloudinary.com/dv5vsvca5/image/upload/v1725351668/${el.imageID}`;
    return (
      <div className="col-md-6 d-flex justify-content-center  py-4 section-card">
        <div className="card">
          <img
            src={imageSrc}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h2 className="card-title">{el.name}</h2>
            <p className="card-text">{el.description}</p>
            <Link to={`/eventi/${el.slug}`}>
              <p className="btn btn-dark card-btn">Scopri di più</p>
            </Link>
          </div>
        </div>
        <hr className="hr-card" />
      </div>
    );
  });

  return (
    <div className="container-fluid" data-aos="fade-up">
      <div className="row eventi-row">{cardElements}</div>
      {/* <div className='discover'>
    <Link to ={`/eventi`}><p className="btn btn-dark">Scopri tutti gli eventi</p></Link>
    </div> */}
    </div>
  );
}

export default Eventi;
