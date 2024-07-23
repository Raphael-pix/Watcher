import { useEffect, useState } from "react";
import "./rows.css";
import fetchMovies from "../../utils/fetchmovies";
import RowContainer from "./Row-conatiner";

export default function Row({ title, url}) {
  const [movies, setMovies] = useState([]);
  const [currentTab,setCurrentTab]=useState('movie')

  async function fetchData(getMediaType) {
    try {
      const data = await fetchMovies(getMediaType);
      setMovies(data);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
      if (currentTab === 'movie'){
        fetchData(url.movie)
      }else{
        fetchData(url.tv)
      }
  }, [url,currentTab]);
  
  return (
    <div className="row-container">
      <div className="row-header">
        <h1 className="row-title">{title}</h1>
            <div className="controls">
              <div className={currentTab === 'movie' ?"control control-active movie-btn":"control movie-btn"} onClick={()=>setCurrentTab('movie')}>movies</div>
              <div className={currentTab === 'tv' ?"control control-active series-btn":"control series-btn"} onClick={()=>setCurrentTab('tv')}>series</div>
            </div>
      </div>
      <div className="movie-posters">        
        {
        movies.map((movie) =>{
        return(
          <RowContainer movie={movie} key={movie.id} getCurrentTab={currentTab}/>
        )})}
      </div>
    </div>
  );
}