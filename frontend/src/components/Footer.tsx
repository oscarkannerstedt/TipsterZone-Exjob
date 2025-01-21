export const Footer = () => {
  return (
    <>
      <nav aria-label="Footer navigation">
        <ul>
          <li>Hem</li>
          <li>Matcher</li>
          <li>Mina Tippningar</li>
          <li>Top Lista</li>
          <li>Regler</li>
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
