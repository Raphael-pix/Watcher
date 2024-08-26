/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react'
import fetchMovies from '../../utils/fetchmovies'
import "./hero.css"
import {FaPlay,FaInfo,FaAngleRight,FaAngleLeft} from "react-icons/fa"
import { GlobalContext } from '../../context/context'
import { useNavigate } from 'react-router-dom'


function Hero({url}) {
    const [moviePosters,setMoviePosters]=useState([])
    const [visiblePoster,setVisiblePoster]=useState(0)
    const [changeBg,setChangeBg] = useState(false)
    const imageUrl ="https://image.tmdb.org/t/p/original"
    const {truncate}=useContext(GlobalContext)
    const navigate = useNavigate()
    
    async function fetchData(){
        try{

            const data =  await fetchMovies(url)
            setMoviePosters(data)
        }catch(e){
            console.error(e)
        }
    }
    useEffect(()=>{
        fetchData()    
    },[url])
    
    useEffect(() => {
        const interval = setInterval(() => {
            setVisiblePoster(prevVisiblePoster => (prevVisiblePoster === moviePosters.length - 1 ? 0 : prevVisiblePoster + 1));
        }, 10000); // Change poster every 5 seconds (5000 milliseconds)

        return () => clearInterval(interval); // Clean up the interval on component unmount
    }, [moviePosters]);

    useEffect(()=>{
        function handleResize(){
            if(window.innerWidth > 375){
                setChangeBg(false)
            }else setChangeBg(true)
        }
        window.addEventListener("resize",handleResize)
        return() => {
            window.addEventListener("resize",handleResize)
        }
    },[])


    function handlePrevious(){
        setVisiblePoster(prevVisiblePoster => (prevVisiblePoster === 0 ? moviePosters.length - 1 : prevVisiblePoster - 1));
    }
    function handleNext(){
        setVisiblePoster(prevVisiblePoster => (prevVisiblePoster === moviePosters.length - 1 ? 0 : prevVisiblePoster + 1));
    }

  return (
    <div className='hero-section'>
      {
        moviePosters.map((poster,index)=>{
            const heroBackground = `${imageUrl}${poster.backdrop_path}`;
            const heroBackground_phone = `${imageUrl}${poster.poster_path}`;
            return(
            <div  key={poster.id}  style={{backgroundImage: `url(${changeBg ? heroBackground_phone : heroBackground})` }} className={index === visiblePoster ? "current-poster" : "current-poster hide-current-poster"}>
                {/* to darken the background image so that the text is more visible */}
                <div className="cover-darken"></div>
                <div className="poster-info">      
                    <h1 className='poster-title'>{poster.name || poster.title || poster.original_title}</h1>
                
                    <p className='overview'>
                        {
                        truncate(poster.overview,150)
                        }
                    </p>
                    
                    <div className="buttons">
                        <button className='play'>
                            <FaPlay size={16}/>
                            Play
                        </button>
                        <button className='more'onClick={()=>navigate(`info/${poster.media_type}/${poster.id}`)} >
                            <FaInfo size={12}/>
                            more details
                        </button>
                    </div>
                </div>

                <div className="hero-icons">
                    <div className="hero-icon left" onClick={()=>handlePrevious()}>
                        <FaAngleLeft size={26} className='left-icon'/>
                    </div>
                    <div className="hero-icon right" onClick={()=>handleNext()}>
                        <FaAngleRight size={26} className='right-icon'/>
                    </div>
                </div>

                <div className="fade-bottom"></div>
            </div>
         )
        })
      }
    </div>
  )
}

export default Hero
