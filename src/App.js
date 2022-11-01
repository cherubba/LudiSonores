import './App.css';
import {Routes, Route} from "react-router-dom"
import PaginaMain from './pages/paginaMain';
import PaginaEventi from './pages/paginaEventi';
import PaginaChiSiamo from './pages/paginaChiSiamo';
import PaginaEventiDettaglio from './pages/paginaEventiDettaglio';
import BandoMasterclass2022 from './pages/bandoMasterclass2022';
import Contatti from './pages/contatti';


function App() {
  return (
    <div> 

      <Routes>
        <Route path='/' element={<PaginaMain />}/>
        <Route path="/eventi" element={<PaginaEventi />}/>
        <Route path='/chisiamo' element={<PaginaChiSiamo/>}/>
        <Route path='/bandoMasterclass2022' element={<BandoMasterclass2022 />}/>
        <Route path='/contatti' element={<Contatti/>}/>
        <Route path='/eventi/:slug' element={<PaginaEventiDettaglio/>}/>
      </Routes>
        
    </div>
     
  );

   

}

export default App;
