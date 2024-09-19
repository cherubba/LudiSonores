import { Link } from "react-router-dom";
import logo from "../images/Livello 1 copia.png";

function Navbar() {
  return (
    <nav class="navbar navbar-expand-lg ">
      <div class="container-fluid">
        <a class="navbar-brand" href="#"></a>
        <button
          class="navbar-toggler custom-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav m-auto p-3">
            <li class="nav-item">
              <Link to="/">
                <p class="nav-link " aria-current="page">
                  home
                </p>
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/eventi">
                <p class="nav-link ">eventi</p>
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/chisiamo">
                <p class="nav-link ">orchestra</p>
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/bandoMasterclassViolino2024">
                <p class="nav-link ">Bando Masterclass di Violino 2024</p>
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/bandoMasterclassArteScenica2024">
                <p class="nav-link ">Bando Masterclass di Arte Scenica 2024</p>
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/contatti">
                <p class="nav-link">contatti</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
