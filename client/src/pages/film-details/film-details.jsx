import {useLocation, useParams } from "react-router-dom";
import  DetailsHeaderContainer from "../../components/details-header-container/DetailsHeader";
import './film-details.css'
import TrailerConatiner from "../../components/trailer-component/trailer";
import CastAndCrew from "../../components/crew-component/crew";
import Reviews from "../../components/reviews-component/reviews";
import Suggested from "../../components/suggested component/Suggested";

export default function FilmDetails(){
    const {id,film} = useParams()
    const location = useLocation()

    return <div className="film-details-container">
        <div className="details-container">
            <DetailsHeaderContainer id={id} mediaType={film}/>
            <TrailerConatiner id={id} mediaType={film}/>
            <CastAndCrew id={id} mediaType={film}/>
            <Reviews id={id} mediaType={film}/>
            <Suggested id={id} mediaType={film} getCurrentLocation={location.pathname.includes('movie') ? 'movie' : 'tv'}/>
        </div>
    </div>
}