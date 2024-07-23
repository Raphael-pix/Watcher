import filters from "./filters";
import "./filter.css";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/context";
import { useLocation } from "react-router-dom";

export default function FilterBox({ handleClose, applyFilters }) {
  const { selectedFilters, setSelectedFilters } = useContext(GlobalContext);
  const location = useLocation()

  const mediaType = location.pathname.includes('movies') ? 'movies' : 'tv-shows'


  function AddFilters(getFilterLabel, getFilter) {
    setSelectedFilters((prevSelectedFilters) => {
      const newSelectedFilters = { ...prevSelectedFilters };

      if (getFilterLabel === "countries") {
        // Check if the filter is already in the array to avoid duplicates
        if (!newSelectedFilters.countries.includes(getFilter)) {
          newSelectedFilters.countries = [
            ...newSelectedFilters.countries,
            getFilter,
          ];
        } else {
          const findIndex = newSelectedFilters.countries.indexOf(getFilter);
          newSelectedFilters.countries.splice(findIndex, 1);
        }
      } else if (getFilterLabel === "genres") {
        if (!newSelectedFilters.genres.includes(getFilter)) {
          newSelectedFilters.genres = [...newSelectedFilters.genres, getFilter];
        } else {
          const findIndex = newSelectedFilters.genres.indexOf(getFilter);
          newSelectedFilters.genres.splice(findIndex, 1);
        }
      } else if (getFilterLabel === "Release Year") {
        if (!newSelectedFilters["release year"].includes(getFilter)) {
          newSelectedFilters["release year"] = [
            ...newSelectedFilters["release year"],
            getFilter,
          ];
        } else {
          const findIndex =
            newSelectedFilters["release year"].indexOf(getFilter);
          newSelectedFilters["release year"].splice(findIndex, 1);
        }
      }

      return newSelectedFilters;
    });
  }
  function clearFilters() {
    setSelectedFilters((prevSelectedFilters) => {
      const newSelectedFilters = { ...prevSelectedFilters };
      newSelectedFilters.countries = [];
      newSelectedFilters.genres = [];
      newSelectedFilters["release year"] = [];

      return newSelectedFilters;
    });
  }

  return (
    <div className="filter-box-container">
      <div className="title-container">
        <h1 className="filter-box-title">Add Filters</h1>
        <button className="clear-btn" onClick={() => clearFilters()}>
          clear
        </button>
      </div>

      {filters.map((filterItem) => {
        if(filterItem.title === 'genres' && filterItem.mediaType === mediaType){
        return (
          <div className="filter-item-container" key={filterItem.title}>
            <h1 className="filter-item-title"> {filterItem.title}</h1>
            <div className="items">
              {
                filterItem.items.map((filter) => {
                    return (
                      <div
                        className={`filter-item ${
                          selectedFilters[
                            filterItem.title.toLowerCase()
                          ].includes(filter.id)
                            ? "active"
                            : ""
                        }`}
                        onClick={() => AddFilters(filterItem.title, filter.id)}
                        key={filter.id}
                      >
                        <input
                          type="checkbox"
                          name={filter.name}
                          id={filter.name}
                          value={filter.name}
                          className="filter-item-checkbox"
                        />
                        <label className="filter-item-label">
                          {filter.name}
                        </label>
                      </div>
                    );
                  })
                }
                </div>
              </div>);
                }else if (filterItem.title !== 'genres'){
                  return (
                    <div className="filter-item-container" key={filterItem.title}>
                      <h1 className="filter-item-title"> {filterItem.title}</h1>
                      <div className="items">
                        {
                      filterItem.items.map((filter) => {
                        return (
                          <div
                            className={`filter-item ${
                              selectedFilters[
                                filterItem.title.toLowerCase()
                              ].includes(filter)
                                ? "active"
                                : ""
                            }`}
                            onClick={() => AddFilters(filterItem.title, filter)}
                            key={filter}
                          >
                            <input
                              type="checkbox"
                              name={filter}
                              id={filter}
                              value={filter}
                              className="filter-item-checkbox"
                            />
                            <label className="filter-item-label">{filter}</label>
                          </div>
                        );
                      })}
                          </div>
                      </div>
                      );
                }
      })}
      <div className="filter-btns">
        <button className="apply-btn filter-btn" onClick={applyFilters}>
          Apply
        </button>
        <button className="close-btn filter-btn" onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
}
