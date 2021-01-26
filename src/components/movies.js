import React from 'react'
const movies = (props) =>{
    let movieInfo;
    if(props.dataloaded){
        let lastMovie = `${props.lastFilm.title} ${new Date(props.lastFilm.date).getFullYear()}`; 
        movieInfo = ( <div className="form-group"> <label htmlFor="movieItems" >Movies</label><ul id="movieItems" className="list-group">{props.films.map(film => <li className="list-group-item" key={film.date}>{film.title}</li>)}</ul><br/> <label htmlFor="lastMovie" >Last Movie</label> <input className="form-control" type="text" id="lastMovie" placeholder={lastMovie} readOnly></input> </div> ) 
    }
    else {
        movieInfo =(<p>Loading ...</p>)
    }
    return movieInfo
}
export default movies;