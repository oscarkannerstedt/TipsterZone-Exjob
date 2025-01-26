import { useEffect, useState } from "react";
import { useHandleNavigation } from "../utils/navigationUtils";
import { useAuth } from "../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faSignInAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

export const Header = () => {
  const [burgerOpen, setBurgerOpen] = useState(false);
  const [menuDisplay, setMenuDisplay] = useState(true);
  const { isLoggedIn, logout } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuDisplay(true);
        setBurgerOpen(false);
      } else {
        setMenuDisplay(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNavigation = useHandleNavigation();

  const handleBurger = () => {
    setBurgerOpen(!burgerOpen);
  };

  const closeMenu = () => {
    setBurgerOpen(false);
  };

  return (
    <section className="header">
      {menuDisplay && (
        <>
          <div className="logo" onClick={() => handleNavigation("/")}>
            <h1>tipsterzone.se</h1>
          </div>
          <nav>
            <ul className="nav-items">
              <li onClick={() => handleNavigation("/matches")}>Matcher</li>
              <li onClick={() => handleNavigation("/leaderboard")}>
                Topplista
              </li>
              <li onClick={() => handleNavigation("/mypredictions")}>
                Mina Spel
              </li>
              {isLoggedIn ? (
                <li onClick={logout}>Logga ut</li>
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
        </>
      )}

      {!menuDisplay && (
        <>
          <div className="logo" onClick={() => handleNavigation("/")}>
            <h1>tipsterzone.se</h1>
          </div>
          <div className="burger" onClick={handleBurger}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          {burgerOpen && (
            <div className={`burger-menu ${burgerOpen ? "open" : ""}`}>
              <nav>
                <ul className="nav-items">
                  <li
                    onClick={() => {
                      handleNavigation("/matches");
                      closeMenu();
                    }}
                  >
                    Matcher
                  </li>
                  <li
                    onClick={() => {
                      handleNavigation("/leaderboard");
                      closeMenu();
                    }}
                  >
                    Topplista
                  </li>
                  <li
                    onClick={() => {
                      handleNavigation("/mypredictions");
                      closeMenu();
                    }}
                  >
                    Mina Spel
                  </li>
                  {isLoggedIn ? (
                    <li className="logout-item" onClick={logout}>
                      <FontAwesomeIcon icon={faSignOutAlt} />
                      <span>Logga ut</span>
                    </li>
                  ) : (
                    <>
                      <li
                        onClick={() => {
                          handleNavigation("/login");
                          closeMenu();
                        }}
                        className="login"
                      >
                        <FontAwesomeIcon icon={faSignInAlt} />
                        <span>Logga In</span>
                      </li>
                      <li
                        onClick={() => {
                          handleNavigation("/signup");
                          closeMenu();
                        }}
                        className="create-user-item"
                      >
                        <FontAwesomeIcon icon={faUserPlus} />
                        <span>Skapa Användare</span>
                      </li>
                    </>
                  )}
                </ul>
              </nav>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Header;
