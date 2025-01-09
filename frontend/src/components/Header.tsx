import { useEffect, useState } from "react";
import { useHandleNavigation } from "../utils/navigationUtils";

export const Header = () => {
  const [burgerOpen, setBurgerOpen] = useState(false);
  const [menuDisplay, setMenuDisplay] = useState(true);
  const isLoggedIn = false;

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

  return (
    <section className="header">
      {menuDisplay && (
        <>
          <div className="logo" onClick={() => handleNavigation("/")}>
            <h1>TIPSTERZONE</h1>
          </div>
          <nav>
            <ul className="nav-items">
              <li onClick={() => handleNavigation("/matches")}>Matcher</li>
              <li onClick={() => handleNavigation("/leaderboard")}>
                Topp Lista
              </li>
              <li onClick={() => handleNavigation("/mypredictions")}>
                Mina Tippningar
              </li>
              {isLoggedIn ? (
                <li>
                  <button onClick={() => alert("Loggar ut...")}>
                    Logga ut
                  </button>
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
        </>
      )}

      {!menuDisplay && (
        <>
          <div className="logo" onClick={() => handleNavigation("/")}>
            <h1>TIPSTERZONE</h1>
          </div>
          <div className="burger" onClick={handleBurger}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          {burgerOpen && (
            <div className="burger-menu">
              <nav>
                <ul className="nav-items">
                  <li onClick={() => handleNavigation("/matches")}>Matcher</li>
                  <li onClick={() => handleNavigation("/leaderboard")}>
                    Topp Lista
                  </li>
                  <li onClick={() => handleNavigation("/mypredictions")}>
                    Mina Tippningar
                  </li>
                  {isLoggedIn ? (
                    <li>
                      <button onClick={() => alert("Loggar ut...")}>
                        Logga ut
                      </button>
                    </li>
                  ) : (
                    <>
                      <li onClick={() => handleNavigation("/login")}>
                        Logga In
                      </li>
                      <li onClick={() => handleNavigation("/signup")}>
                        Skapa Användare
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
