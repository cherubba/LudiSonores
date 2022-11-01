import { Link } from "react-router-dom"

function Navbar() {
    return(
        <nav class="navbar navbar-expand-lg ">
            <div class="container-fluid">
              <a class="navbar-brand" href="#">
              </a>
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
                    <Link to="/"><p class="nav-link link-light " aria-current="page">
                      home
                    </p></Link>
                  </li>
                  <li class="nav-item">
                    <Link to ="/eventi"><p class="nav-link link-light">
                      eventi
                    </p></Link>
                  </li>
                  <li class="nav-item">
                    <Link to ='/chisiamo'><p class="nav-link link-light">
                      orchestra
                    </p></Link>
                  </li>
                  <li class="nav-item">
                    <Link to='/bandoMasterclass2022'><p class="nav-link link-light">bando Masterclass 2022</p></Link>
                  </li>
                  <li class="nav-item">
                    <Link to='/contatti'><p class="nav-link link-light">contatti</p></Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
    )
}

export default Navbar