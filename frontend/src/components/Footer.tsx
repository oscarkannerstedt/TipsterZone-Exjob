export const Footer = () => {
  return (
    <section className="footer-wrapper">
      <nav aria-label="Footer navigation">
        <ul className="nav-items">
          <li>Hem</li>
          <li>Matcher</li>
          <li>Mina Tippningar</li>
          <li>Top Lista</li>
          <li>Regler</li>
        </ul>
      </nav>

      <div className="footer-info">
        <p>
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
        <p>&copy; 2025 TipsterZone. Alla rättigheter förbehållna.</p>
      </div>
    </section>
  );
};

export default Footer;
