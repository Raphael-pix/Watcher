import "./crew.css";
import { useEffect, useState } from "react";
import { baseUrl, API_KEY } from "../../utils/request";
import { CircularSkeletonLoader } from "../skeleton-loader/skeleton";

export default function CastAndCrew({ id, mediaType }) {
  const [crew, setCrew] = useState(null);
  const [actors, setActors] = useState(null);
  const imageUrl = "https://image.tmdb.org/t/p/original";
  const [imageLoaded,setImageLoaded]=useState(false)
  async function fetchCrew() {
    if (mediaType === "movie") {
      try {
        const response = await fetch(
          `${baseUrl}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
        );
        const result = await response.json();
        setCrew(result.cast);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const response = await fetch(
          `${baseUrl}/tv/${id}/credits?api_key=${API_KEY}&language=en-US`
        );
        const result = await response.json();
        setCrew(result.cast);
      } catch (err) {
        console.log(err);
      }
    }
  }

  useEffect(() => {
    if (crew) {
      let actingCrew = crew.filter(
        (crew) => crew.known_for_department === "Acting" && crew.order <= 12
      );
      setActors(actingCrew);
    }
  }, [crew]);
  useEffect(() => {
    fetchCrew();
  }, [id]);

  if (crew && crew.length) {
    return (
      <div className="castcrew-container">
        <h1 className="section-title">Cast & Crew</h1>
        {crew && actors ? (
          <div className="actors-list">
            {actors.map((actor) => {
              if (actor?.character !== "" && actor?.profile_path) {
                return (
                  <div className="actor-container" key={actor.cast_id}>
                    <div className="actor-profile-image-container">
                    {!imageLoaded && <CircularSkeletonLoader />} 
                      <img
                        src={`${imageUrl}${actor?.profile_path}`}
                        alt={actor.name}
                        className="actor-profile-image"
                        onLoad={() => setImageLoaded(true)}
                        style={{ display: imageLoaded? "block" : "none" }} /* Hide image until it's loaded */
                      />
                    </div>
                    <p className="character" style={{ display: imageLoaded? "block" : "none" }} >
                      <span className="actor-name">{actor.name}</span>
                      <span className="chacter-name">"{actor?.character}"</span>
                    </p>
                  </div>
                );
              }
            })}
          </div>
        ) : null}
        {/* <div className="fade-left"></div> */}
        {/* <div className="fade-right"></div> */}
      </div>
    );
  } else {
    return null;
  }
}
