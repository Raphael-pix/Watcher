/* eslint-disable react/prop-types */
import "./details.css";
import { useState, useEffect } from "react";
import { baseUrl, API_KEY } from "../../utils/request";

const DetailsDescription = ({ id, mediaType }) => {
  const [film, setFilms] = useState(null);

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
  console.log(film);
  useEffect(() => {
    fetchFilms();
  }, [id]);
  if (film) {
    return (
      <div className="descriprion-container">
        <h1 className="section-title">Description</h1>
        <p className="description-text">{film.overview}</p>
      </div>
    );
  }
};

export default DetailsDescription;
