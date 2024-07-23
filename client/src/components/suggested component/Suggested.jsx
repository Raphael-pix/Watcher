import './suggested.css'
import { useEffect, useState } from "react"
import { baseUrl, API_KEY } from "../../utils/request";
import RowContainer from "../rows/Row-conatiner";

export default function Suggested({id,mediaType,getCurrentLocation}){
    
    const [suggestedFilms,setSuggestedFilms]=useState([])

    async function getSuggestedFilms(){
        if (mediaType === "movie") {
            try{
            const response = await fetch(`${baseUrl}/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`)
            const result = await response.json()
            setSuggestedFilms(result.results)
            }catch(error){
                console.log(error)
            }
        }else{
            try{
                const response = await fetch(`${baseUrl}/tv/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`)
                const result = await response.json()
                setSuggestedFilms(result.results)
                }catch(error){
                    console.log(error)
                }
        }
    }
    useEffect(()=>{
        getSuggestedFilms()
    },[id])
    
    if(suggestedFilms && suggestedFilms.length){
        return <div className="suggested-container">
            <h1 className="section-title">Reccomended</h1>
            <div className="suggested-list">
                {
                    suggestedFilms.map((film)=>(
                        <RowContainer movie={film} key={film.id} getCurrentTab={getCurrentLocation}/>
                    ))
                }
            </div>
        </div>
    }else return null
}