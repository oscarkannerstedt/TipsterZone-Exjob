import { useState } from "react";
import { useHandleNavigation } from "../utils/navigationUtils";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = false;

  const handleNavigation = useHandleNavigation();

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" onClick={() => handleNavigation("/")}>
          TIPSTERZONE
        </div>
        <div
          className="burger-menu"
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          role="button"
          aria-label="Öppna meny"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <nav className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <ul>
          <li onClick={() => handleNavigation("/matches")}>Matcher</li>
          <li onClick={() => handleNavigation("/leaderboard")}>Topp Lista</li>
          <li onClick={() => handleNavigation("/mypredictions")}>
            Mina Tippningar
          </li>

          {isLoggedIn ? (
            <li>
              <button onClick={() => alert("Loggar ut...")}>Logga ut</button>
            </li>
          ) : (
            <>
              <li onClick={() => handleNavigation("/login")}>Logga In</li>
              <li onClick={() => handleNavigation("/signup")}>
                Skapa Användare
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
