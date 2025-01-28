export const Rules = () => {
  return (
    <div className="rules-page">
      <div className="rules-container">
        <h1>Regler och information</h1>
        <p className="app-description">
          Välkommen till tipsterzone.se! Här kan du sätta din kunskap och
          magkänsla på prov genom att tippa resultat och samla poäng. Tävla mot
          andra spelare och se vem som kan klättra högst på topplistan.
        </p>

        <section className="how-it-works">
          <h2>Hur fungerar applikationen?</h2>
          <p>
            Tipsterzone låter dig tippa på olika resultat baserat på din
            bedömning. När du gör ett val registreras det, och poängen
            uppdateras automatiskt en stund efter att matchen är färdigspelad.
            Resultatet rättas då och kan ge dig plus- eller minuspoäng beroende
            på om din gissning var korrekt.
          </p>
        </section>

        <section className="rules-list">
          <h3>Poängsystem</h3>
          <ul>
            <li>
              ✅ <b>3 poäng</b> om du tippar rätt resultat.
            </li>
            <li>
              ❌ <b>-1 poäng</b> om du tippar fel resultat.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Rules;
