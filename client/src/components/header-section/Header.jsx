import menu from "./navMenu";
import { FaSearch } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import "./header.css";
import { useContext, useEffect, useState } from "react";
import requests from "../../utils/request";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/context";
import ToogleTheme from "../toogleTheme-component/toogle";
import Menu from "./Menu";

export default function Header() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const base_URL = "https://api.themoviedb.org/3";
  const imageUrl = "https://image.tmdb.org/t/p/original";

  const [, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [show, handleShow] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isMenuVisible,setIsMenuVisible]= useState(false)
  const {theme,setTheme,user,setUser}=useContext(GlobalContext)
  const navigate = useNavigate()

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        handleShow(true);
      } else handleShow(false);
    });
  }, []);

  async function searchInfo(value) {
    try {
      const response = await fetch(
        `${base_URL}${requests.getSearch}&query=${value}`
      );
      const data = await response.json();
      setSearchResults(data.results);
    } catch (e) {
      console.log(e);
    }
  }

  function toggleSearch() {
    setIsSearchVisible(!isSearchVisible);
  }
  function handleChange(value) {
    setInputValue(value);
    searchInfo(value);
  }
  function handleReset(){
    setIsSearchVisible(false)
    setSearchResults([])
  }
  function handleToggleTheme(){
    setTheme(theme === 'light'? 'dark' :'light')
  }
  function handleLogout(){
    setUser(null)
  }
  return (
    <div
      className={`header-container ${isHomePage ? "fixed" : "absolute"}`}
      style={
        show && isHomePage
          ? { backgroundColor: "var(--background)" }
          : { backgroundColor: "transparent" }
      }
    >
      <h1 className="logo">watcher</h1>
      <h1 className="logo-small">w</h1>

      <ul className="nav-menu">
        {menu.map((menuItem) => {
          return (
            <NavLink
              key={menuItem.label}
              to={menuItem.to}
              className="menu-item"
              style={({ isActive }) =>
                isActive
                  ? { color: "var(--header-text-active)", fontWeight: 600 }
                  : { color: "var( --header-text-supplementary)" }
              }
            >
              {menuItem.label}
            </NavLink>
          );
        })}
      </ul>

      <div className="right-section">
        <div className="search-options-container">
          <div
            className={`search-container ${isSearchVisible ? "visible" : ""}`}
          >
            <FaSearch
              size={17}
              className="icons search"
              onClick={() => toggleSearch()}
            />
            <input
              type="text"
              name="search"
              placeholder="search for movies/series"
              className="search-input"
              onChange={(e) => handleChange(e.target.value)}
            />
          </div>
          <div className="search-results">
            {searchResults.map((result) =>
              result.poster_path ? (
                <Link to={`/info/${result.media_type}/${result.id}`} key={result.id} onClick={()=>handleReset()}>
                <div className="result">
                  <img
                    src={`${imageUrl}${result.poster_path}`}
                    alt={
                      result.original_name ||
                      result.name ||
                      result.original_title ||
                      result.title
                    }
                  />
                  <div className="result-details">
                    <p>
                      {result.original_name ||
                        result.name ||
                        result.original_title ||
                        result.title}
                    </p>
                    <p className="release-year">
                    {new Date(
                      result.release_date || result.first_air_date
                    ).getFullYear()}
                    </p>
                  </div>
                </div>
                </Link>
              ) : null
            )}
          </div>
        </div>
        <IoMdMenu size={24} color="#FFFFFF" className="menu-btn" onClick={()=>setIsMenuVisible(!isMenuVisible)}/>
        <ToogleTheme handleToogle={()=>handleToggleTheme()} isChecked={theme === 'dark'} theme={theme}/>
        {
          user === null?
          <button className="login-btn" onClick={()=>navigate('/accounts/login')}>login</button>
          :
          <button className="login-btn" onClick={()=>handleLogout()}>logout</button>
        }
      </div>
      {
        isMenuVisible && <Menu/>
      }
    </div>
  );
}
