import './rows.css'
import { Link } from "react-router-dom"
import SkeletonLoader from "../skeleton-loader/skeleton"
import { FaStar } from "react-icons/fa";
import { useContext, useState } from 'react';
import { GlobalContext } from '../../context/context';

export default function RowContainer({movie,getCurrentTab}){
  const imageUrl = "https://image.tmdb.org/t/p/original";
  const releaseYear = new Date(movie.release_date || movie.first_air_date).getFullYear();
  const [imageLoaded, setImageLoaded] = useState(false);
  const {setSelectedFilm,truncate} = useContext(GlobalContext)
  
  function getFilmDetails(getFilm){
    setSelectedFilm(getFilm)
  }

  return(
        <Link to={`/info/${getCurrentTab === "movie" ? "movie" : "tv"}/${movie.id}`} key={movie.id} className="movie-link">
        <div className='poster' key={movie.id} onClick={()=>getFilmDetails(movie)}>
          {!imageLoaded && <SkeletonLoader />} 
            <img
              src={`${imageUrl}${ movie.poster_path}` || '../../images/no-image.jpg'}
              alt={movie.title || movie.name}
              className='movie-poster'
             onLoad={() => setImageLoaded(true)}
              style={{ display: imageLoaded? "block" : "none" }} /* Hide image until it's loaded */
            />
            <div className="movie-details" style={{ display: imageLoaded? "flex" : "none" }}>
              <p className="movie-title">{truncate(movie.title || movie.name,50)}</p>
              <div className="movie-other-info">
                <p className="movie-release-date">{releaseYear}</p>
                <p className="movie-rating"><FaStar className="star-icon"/><span>{movie.vote_average.toFixed(1)}</span></p>
              </div>
            </div>
        </div>
     </Link>
    )
}