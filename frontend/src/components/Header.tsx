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
          <div
            role="menuitem"
            tabIndex={0}
            className="logo"
            onClick={() => handleNavigation("/")}
          >
            <h1>tipsterzone.se</h1>
          </div>
          <nav>
            <ul className="nav-items">
              <li
                role="menuitem"
                tabIndex={0}
                onClick={() => handleNavigation("/matches")}
              >
                Matcher
              </li>
              <li
                role="menuitem"
                tabIndex={0}
                onClick={() => handleNavigation("/leaderboard")}
              >
                Topplista
              </li>
              <li
                role="menuitem"
                tabIndex={0}
                onClick={() => handleNavigation("/mypredictions")}
              >
                Mina Spel
              </li>
              {isLoggedIn ? (
                <li role="menuitem" tabIndex={0} onClick={logout}>
                  Logga ut
                </li>
              ) : (
                <>
                  <li
                    role="menuitem"
                    tabIndex={0}
                    onClick={() => handleNavigation("/login")}
                  >
                    Logga In
                  </li>
                  <li
                    role="menuitem"
                    tabIndex={0}
                    onClick={() => handleNavigation("/signup")}
                  >
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
          <div
            className="logo"
            role="Navigate to start page"
            tabIndex={0}
            onClick={() => handleNavigation("/")}
          >
            <h1>tipsterzone.se</h1>
          </div>
          <div
            tabIndex={0}
            role="button"
            className="burger"
            onClick={handleBurger}
            aria-label="Öppna navigationsmeny"
            aria-expanded={burgerOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          {burgerOpen && (
            <div className={`burger-menu ${burgerOpen ? "open" : ""}`}>
              <nav>
                <ul className="nav-items">
                  <li
                    role="menuitem"
                    tabIndex={0}
                    onClick={() => {
                      handleNavigation("/matches");
                      closeMenu();
                    }}
                  >
                    Matcher
                  </li>
                  <li
                    role="menuitem"
                    tabIndex={0}
                    onClick={() => {
                      handleNavigation("/leaderboard");
                      closeMenu();
                    }}
                  >
                    Topplista
                  </li>
                  <li
                    role="menuitem"
                    tabIndex={0}
                    onClick={() => {
                      handleNavigation("/mypredictions");
                      closeMenu();
                    }}
                  >
                    Mina Spel
                  </li>
                  {isLoggedIn ? (
                    <li
                      className="logout-item"
                      role="menuitem"
                      tabIndex={0}
                      onClick={logout}
                    >
                      <FontAwesomeIcon icon={faSignOutAlt} />
                      <span>Logga ut</span>
                    </li>
                  ) : (
                    <>
                      <li
                        role="menuitem"
                        tabIndex={0}
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
                        role="menuitem"
                        tabIndex={0}
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
