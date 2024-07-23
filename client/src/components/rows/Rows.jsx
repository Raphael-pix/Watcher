import { useContext, useEffect, useState } from "react";
import "./rows.css";
import { GlobalContext } from "../../context/context";
import { useLocation } from "react-router-dom";
import { IoFilter } from "react-icons/io5";
import { baseUrl,API_KEY } from "../../utils/request";
import FilterBox from "../filter-box-component/filterBox";
import Pagination from "../pagination/pagination";
import RowContainer from "./Row-conatiner";

export default function Row({ title}) {
  const location = useLocation()
  const {selectedFilters} = useContext(GlobalContext)
  const [movies, setMovies] = useState([]);
  const [currentPage,setCurrentPage]=useState(1)
  const totalPages = 500
  const [isFilterboxVisible,setIsFilterboxVisible] = useState(false)
  const [url,setUrl] =useState(`${baseUrl}/discover/${location.pathname === '/movies' ? 'movie' : 'tv' }?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=${currentPage}&sort_by=popularity.desc`)
  
  function applyFilters(){
    setCurrentPage(1)
    setUrl(`${baseUrl}/discover/${location.pathname === '/movies' ? 'movie' : 'tv' }?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=${currentPage}&sort_by=popularity.desc  ${selectedFilters.genres.length > 0 ?`&with_genres=${selectedFilters.genres.join(',')}` : ''} ${selectedFilters['release year'].length > 0 ?`&primary_release_year=${selectedFilters['release year'].join(',')}` : ''} ${selectedFilters.countries.length > 0 ?`&region=${selectedFilters.countries.join(',')}` : ''} `)
    setIsFilterboxVisible(false)
  }
 function handleScrollToTop(){
  window.scrollTo({
      top:0,left:0,behavior:'auto'
  })
}

  async function fetchData() {
      try {
        const response = await fetch(url)
        const result = await response.json()
        setMovies(result.results)
      } catch (e) {
        console.error(e);
      }
    }
  useEffect(()=>{
    setUrl(`${baseUrl}/discover/${location.pathname === '/movies' ? 'movie' : 'tv' }?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=${currentPage}&sort_by=popularity.desc  ${selectedFilters.genres.length > 0 ?`&with_genres=${selectedFilters.genres.join(',')}` : ''} ${selectedFilters['release year'].length > 0 ?`&primary_release_year=${selectedFilters['release year'].join(',')}` : ''} ${selectedFilters.countries.length > 0 ?`&region=${selectedFilters.countries.join(',')}` : ''} `)
    fetchData()
    handleScrollToTop()
  },[location.pathname,url,currentPage])

function closeFilterBox(){
  setIsFilterboxVisible(false)
}
function handlePageChange(pageNumber){
  setCurrentPage(pageNumber)
}
  return (
    <div className="row-container">
      <div className="row-header">
        <h1 className="row-title">{title}</h1>
            <div className="controls">
              <div className={`filter-button-container ${isFilterboxVisible ? 'active' : ''}`} onClick={()=>setIsFilterboxVisible(!isFilterboxVisible)}>
                <IoFilter className="filter-button" size={18}/>
                <span>filter</span>
              </div>
            </div>
      </div>
      <div className="movie-posters">        
        {
        movies.map((movie) =>{
        return( 
          <RowContainer movie={movie} key={movie.id} getCurrentTab={location.pathname === '/movies' ? 'movie' : 'tv'}/>
        )})}
      </div>
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      {
        isFilterboxVisible ?
        <>
        <FilterBox handleClose={closeFilterBox} applyFilters={applyFilters}/>
        <div className="cover-darken"></div>
        </>
        :null
      }
    </div>
  );
}