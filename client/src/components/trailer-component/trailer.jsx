import "./trailer.css";
import YouTube from "react-youtube";
import { useEffect, useState } from "react";
import { baseUrl, API_KEY } from "../../utils/request";

export default function TrailerConatiner({ id, mediaType }) {
  const [filmVideos, setFilmsVideos] = useState(null);
  const [filmTrailers, setFilmsTrailers] = useState(null);
  const [errors,setErrors]=useState({})
  async function fetchFilmsVideos() {
    if (mediaType === "movie") {
      try {
        const response = await fetch(
          `${baseUrl}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
        );
        const result = await response.json();
        setFilmsVideos(result.results);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const response = await fetch(
          `${baseUrl}/tv/${id}/videos?api_key=${API_KEY}&language=en-US`
        );
        const result = await response.json();
        setFilmsVideos(result.results);
      } catch (err) {
        console.log(err);
      }
    }
  }
  useEffect(() => {
    fetchFilmsVideos();
  }, [id]);

  const opts = {
    height: "200",
    width: "320",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };
  useEffect(() => {
    if (filmVideos) {
      let filmTrailers = filmVideos.filter((video) => video.type === "Trailer");
      setFilmsTrailers(filmTrailers.splice(0, 3));
    }
  }, [filmVideos]);

  const handleVideoError = (videoId) => {
    setErrors((prevErrors) => ({ ...prevErrors, [videoId]: true }));
  };
  console.log(filmTrailers)

  if (filmTrailers && filmTrailers.length) {
    return (
      <div className="trailer-videos-container">
        {filmVideos && filmTrailers ? (
          <div className="trailer-videos">
            <h1 className="section-title">watch trailer</h1>
            <div className="videos">
              {filmTrailers.map((trailerItem) => {
               if(errors[trailerItem.key]){
                return null
               }else{
                return (
                  <YouTube
                    videoId={trailerItem.key}
                    opts={opts}
                    key={trailerItem.key}
                    onError={() => handleVideoError(trailerItem.key)}
                  />
                )}
              })}
            </div>
          </div>
        ) : null}
      </div>
    );
  } else return null;
}
