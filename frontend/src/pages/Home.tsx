export const Home = () => {
  return (
    <div className="home-container">
      <section className="heading-section">
        <h2>Välkommen till Tipsterzone - Ta del av de bästa speltipsen!</h2>
        <p>
          Här kan du ta del av speltips från topp tipparna, följa kommande
          matcher och utmana dina vänner i att förutse resultaten. En perfekt
          plats för alla som älskar sport och strategiskt tänkande!
        </p>
      </section>

      <section className="features-section">
        <h3>Varför välja tipsterzone?</h3>
        <div className="features-grid">
          <div className="feature-item">
            <img
              src="/images/stadium_image.jpg"
              alt="En fullsatt fotbolls arena."
              loading="lazy"
              height="150"
              width="300"
            />
            <h4>Ta del av top 30 tipparnas speltips</h4>
            <p>
              Få inspiration från de bästa tipparna och analysera deras val för
              att förbättra dina egna beslut och strategier.
            </p>
          </div>
          <div className="feature-item">
            <img
              src="/images/soccer-fans-sitting-bar.jpg"
              alt="Ett gäng kompisar som sitter på en bar och kollar fotboll tillsammans."
              loading="lazy"
              height="150"
              width="300"
            />
            <h4>Tävla med vänner</h4>
            <p>
              {" "}
              Utmana dina vänner och se vem som kan förutse flest rätt resultat.
              Spänning och gemenskap i ett!
            </p>
          </div>
          <div className="feature-item">
            <img
              src="/images/leaderboard.jpg"
              alt="2 personer som analyserar statistik på en surfplatta."
              loading="lazy"
              height="150"
              width="300"
            />
            <h5>Håll koll på kommande matcher</h5>
            <p>
              {" "}
              Följ dina favoritligor, håll dig uppdaterad om kommande matcher
              och planera dina tippningar i förväg.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
