import menu from "./navMenu";
import "./header.css";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/context";
import ToogleTheme from "../toogleTheme-component/toogle";

export default function Menu() {
  const { theme, setTheme, user, setUser } = useContext(GlobalContext);
  const navigate = useNavigate();

  function handleToggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }
  function handleLogout() {
    setUser(null);
  }
  return (
    <div className="vertical-menu">
        <ToogleTheme
  handleToogle={() => handleToggleTheme()}
  isChecked={theme === "dark"}
  theme={theme}
/>
      <ul className="vertical-nav-menu">
        {menu.map((menuItem) => {
          return (
            <NavLink
              key={menuItem.label}
              to={menuItem.to}
              className="vertical-menu-item"
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
        {user === null ? (
          <button
            className="login-btn login-btn-vertical"
            onClick={() => navigate("/accounts/login")}
          >
            login
          </button>
        ) : (
          <button
            className="login-btn login-btn-vertical"
            onClick={() => handleLogout()}
          >
            logout
          </button>
        )}
      </ul>
    </div>
  );
}
