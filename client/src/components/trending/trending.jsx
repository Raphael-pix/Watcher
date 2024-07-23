import { useContext, useEffect, useState } from "react";
import "./trending.css";
import requests from "../../utils/request";
import { GlobalContext } from "../../context/context";
import { Link } from "react-router-dom";
import { baseUrl } from "../../utils/request";

export default function Trending() {
  const imageUrl = "https://image.tmdb.org/t/p/original";
  const {setSelectedFilm} = useContext(GlobalContext)
  const [movies, setMovies] = useState([]);
  const [currentTab,setCurrentTab]=useState('movie')

  async function fetchData(url) {
    try{
        const response = await fetch(`${baseUrl}${url}`)
        const data = await response.json()
        setMovies(data.results.splice(0,10))
        
    }catch(e){
        console.error(e)
    }
  }

  useEffect(() => {
    currentTab === 'movie'?
    fetchData(requests.fetchTrending.movie)
    : 
    fetchData(requests.fetchTrending.tv)
  }, [currentTab]);

function getFilmDetails(getFilm){
  setSelectedFilm(getFilm)
}


  return (
    <div className="trending-container">
      <div className="trending-header">
        <h1 className="row-title">trending</h1>
            <div className="controls">
              <div className={currentTab === 'movie' ?"control control-active movie-btn":"control movie-btn"} onClick={()=>setCurrentTab('movie')}>movies</div>
              <div className={currentTab === 'tv' ?"control control-active series-btn":"control series-btn"} onClick={()=>setCurrentTab('tv')}>series</div>
            </div>
      </div>
      <div className="movie-posters">        
        {
        movies.map((movie,index) =>
          movie.media_type === currentTab?
         <Link to={`info/${movie.media_type === "movie" ? "movie" : "tv"}/${movie.id}`} key={movie.id}>
            <div className= 'poster-large' key={movie.id} onClick={()=>getFilmDetails(movie)}>
                <div className="number">
                  <p>{index+1}</p>
                  </div>

                <img
                  src={`${imageUrl}${ movie.poster_path}`}
                  alt={movie.title || movie.name}
                  className='movie-poster-large'
                />
            </div>
         </Link>
        : null
        )}
      </div>
    </div>
  );
}