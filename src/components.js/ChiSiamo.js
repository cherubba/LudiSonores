import {Link} from 'react-router-dom'

function ChiSiamo(){

    return(
        <>
        <div className="container-fluid" data-aos="fade-up">
            <div className="row imgbgchiamo align-items-end">
                <div className="col ">
                    <h2 id="chisiamo-title">Orchestra Ludi Sonores</h2>
                    <p id="chisiamo-para">L'associazione Ludi Sonores nasce 
                    dal desiderio dei maestri Andrea Rossi e 
                    Claudio Aiello di creare una realtà musicale 
                    indipendente che abbia come obiettivo la valorizzazione 
                    e la divulgazione del grande repertorio sinfonico e operistico.</p>
                </div>
                <div className="col d-flex justify-content-center btn-col">
                   <button id="chisiamo-btn" className='btn-light'><Link className='link-dark' to="/chisiamo">Chi siamo</Link></button>
                </div>
            </div>
        </div>
        <hr class="hr5chisiamo"/>
        </>
    )
}

export default ChiSiamo