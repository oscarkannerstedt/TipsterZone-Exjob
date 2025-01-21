import { useHandleNavigation } from "../utils/navigationUtils";

export const Footer = () => {
  const handleNavigation = useHandleNavigation();

  return (
    <>
      <nav aria-label="Footer navigation">
        <ul>
          <li onClick={() => handleNavigation("/")}>Hem</li>
          <li onClick={() => handleNavigation("/matches")}>Matcher</li>
          <li onClick={() => handleNavigation("/mypredictions")}>
            Mina Tippningar
          </li>
          <li onClick={() => handleNavigation("/leaderboard")}>Top Lista</li>
          <li onClick={() => handleNavigation("/rules")}>Regler</li>
        </ul>
      </nav>

      <div className="footer-info">
        <h2>tipsterzone.se</h2>
        <p className="text-info">
          Tippning är en rolig aktivitet och är inte kopplad till spel om
          pengar. Spel om pengar kan leda till spelproblem. Behöver du hjälp?
          Kontakta{" "}
          <a
            href="https://www.stodlinjen.se"
            target="_blank"
            rel="noopener noreferrer"
          >
            Stödlinjen
          </a>
          .
        </p>
        <p className="copyright-text">
          &copy; 2025 <span>tipsterzone.se</span>. Alla rättigheter förbehållna.
        </p>
      </div>
    </>
  );
};

export default Footer;
