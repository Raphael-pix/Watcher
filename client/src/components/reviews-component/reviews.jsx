import { useContext, useEffect, useState } from "react"
import { baseUrl, API_KEY } from "../../utils/request";
import './reviews.css'
import { GlobalContext } from "../../context/context";
import { Link } from "react-router-dom";

export default function Reviews({id,mediaType}){
    const [reviews,setReviews]=useState(null)
    const {truncate} = useContext(GlobalContext)
    const imageUrl = "https://image.tmdb.org/t/p/original";

    async function fetchReviews(){
        if (mediaType === "movie") {
            try {
              const response = await fetch(
                `${baseUrl}/movie/${id}/reviews?api_key=${API_KEY}&language=en-US`
              );
              const result = await response.json();
              setReviews(result.results);
              return result.results
            } catch (err) {
              console.log(err);
            }
          } else {
            try {
              const response = await fetch(
                `${baseUrl}/tv/${id}/reviews?api_key=${API_KEY}&language=en-US`
              );
              const result = await response.json();
              setReviews(result.results);
              return result.results
            } catch (err) {
              console.log(err);
            }}
    }

    useEffect(()=>{
        fetchReviews()
    },[id])
   
    if(reviews && reviews.length){
    return <div className="reviews-container">
        <h1 className="section-title">reviews</h1>
        {
            reviews ? 
                <div className="reviews-list">
                    {
                        reviews.map((review)=>{
                            return <Link to={review.url} target='_blank' className="review-link"  key={review.id}>
                             <div className="review-container" >
                                <div className="reviewer-details-container">
                                    <div className="reviewer-image-container">
                                        {
                                            review.author_details.avatar_path ? 
                                                <img src={`${imageUrl}${review.author_details.avatar_path}`} alt={review.author} className="reviewer-image"/>
                                            : 
                                           <p className="reviewer-initial">{review.author.substring(0,1)}</p> 
                                        }
                                    </div>
                                    <p className="reviewer-name">{review.author}</p>
                                </div>
                                <p className="review">{truncate(review.content,320)}</p>
                            </div>
                        </Link>
                        })
                    }

                </div>
            : null
        }
    </div>
    }else return null
}