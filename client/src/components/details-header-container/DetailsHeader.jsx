/* eslint-disable react/prop-types */
import "./details.css";
import { useEffect, useState, useContext } from "react";
import { baseUrl, API_KEY } from "../../utils/request";
import { FaPlay, FaStar } from "react-icons/fa";
import {
  MdOutlineBookmarkAdd,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { GlobalContext } from "../../context/context";


export default function DetailsHeaderContainer({ id, mediaType }) {
  const [film, setFilms] = useState(null);
  const imageUrl = "https://image.tmdb.org/t/p/original";
  const { truncate, convertMinutesToHoursAndMinutes } =useContext(GlobalContext);
  const [truncatedText, setTrunctactedText] = useState("");
  const [isTextTruncated, setIsTextTruncated] = useState();

  async function fetchFilms() {
    if (mediaType === "movie") {
      try {
        const response = await fetch(
          `${baseUrl}/movie/${id}?api_key=${API_KEY}&language=en-US`
        );
        const result = await response.json();
        setFilms(result);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const response = await fetch(
          `${baseUrl}/tv/${id}?api_key=${API_KEY}&language=en-US`
        );
        const result = await response.json();
        setFilms(result);
      } catch (err) {
        console.log(err);
      }
    }
  }
  console.log(film)


  useEffect(() => {
    fetchFilms();
  }, [id]);


  useEffect(() => {
    if (film && film.overview) {
      if (film.overview.length > 200) {
        setTrunctactedText(truncate(film.overview, 180));
        setIsTextTruncated(true);
      } else {
        setTrunctactedText(film.overview);
        setIsTextTruncated(false);
      }
    }
  }, [film]);

  function showMore() {
    if (isTextTruncated) {
      setTrunctactedText(film.overview);
      setIsTextTruncated(false);
    } else {
      setTrunctactedText(truncate(film.overview, 180));
      setIsTextTruncated(true);
    }
  }
  
  if (film) {
    return (
        <div className="film-details-header-container">
          <div
          className="film-detail-container"
          style={{ backgroundImage: `url(${imageUrl}${film.backdrop_path})` }}
        >
          <div className="cover-darken"></div>
          <div className="film-image-container">
            <img
              src={`${imageUrl}${film.poster_path}`}
              alt={film.title || film.original_title || film.name}
              className="film-image"
            />
          </div>
          <div className="film-container">
            <div className="film-info-container">
              <h1 className="film-name">
                {film.title || film.original_title || film.name}
              </h1>
              <div className="film-info">
                <p className="date-time">
                  <span className="date">
                    {new Date(
                      film.release_date || film.first_air_date
                    ).getFullYear()}
                  </span>
                  {
                    film.runtime || film.episode_run_time[0] ?
                  <span className="runtime">
                    {convertMinutesToHoursAndMinutes(
                      film.runtime || film.episode_run_time[0]
                    )}
                  </span>
                  : null
                  }
                </p>
                <p className="genres">
                  {film.genres
                    .map((genreItem) => {
                      return genreItem.name;
                    })
                    .join(", ")}
                </p>
                <div className="film-ratings">
                  <FaStar className="star-icon" />
                  <span>
                    {film.vote_average.toFixed(1)} ({film.vote_count} votes)
                  </span>
                </div>
                <div className="controls">
                  <button className="trailer-btn control-btn">
                    <FaPlay className="play-icon contol-icon" />
                    <span>play</span>
                  </button>
                  <button className="watchlist-btn control-btn">
                    <MdOutlineBookmarkAdd
                      size={20}
                      className="add-icon contol-icon"
                    />
                    <span>add to watchlist</span>
                  </button>
                </div>
                <div className="film-description">
                  <p className="description-text">{truncatedText}</p>
                  <button onClick={() => showMore()}>
                    <span>{isTextTruncated ? "Read more" : "Show less"}</span>
                    {isTextTruncated ? (
                      <MdOutlineKeyboardArrowDown
                        size={18}
                        className="down-icon"
                      />
                    ) : (
                      <MdOutlineKeyboardArrowUp size={18} className="up-icon" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fade-bottom"></div>
          </div>
        </div>
    )
  } else return null;
}