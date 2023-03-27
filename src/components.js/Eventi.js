import { Link } from 'react-router-dom'
import database from "../database.json"

function Eventi(){


    const cardElements = database.slice(0, 4).map(el =>{
        return <div className="col-md-6 d-flex justify-content-center my-5 py-5 section-card"><div className="card">
        <img src={`https://drive.google.com/uc?id=${el.imageID}`} className="card-img-top" alt="..."/>
        <div className="card-body">
        <h2 className="card-title">{el.name}</h2>
        <p className="card-text">{el.description}</p>
        <Link to ={`/eventi/${el.slug}`}><p className="btn btn-dark card-btn">Scopri di più</p></Link>
    </div>
    
</div>
<hr className="hr-card"/>
</div>
    })


    return(
        <div className="container-fluid" data-aos="fade-up" >
        <div className="row eventi-row" >
            {cardElements}
    </div>
    {/* <div className='discover'>
    <Link to ={`/eventi`}><p className="btn btn-dark">Scopri tutti gli eventi</p></Link>
    </div> */}
    </div>
    )
}

export default Eventi