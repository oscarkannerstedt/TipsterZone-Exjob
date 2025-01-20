export const getPredictionDescription = (
  predictedOutcome: string,
  homeTeam: string,
  awayTeam: string
) => {
  switch (predictedOutcome) {
    case "1":
      return `${homeTeam} vinner`;
    case "X":
      return "Oavgjort";
    case "2":
      return `${awayTeam} vinner`;
    default:
      return "Ingen tippning gjord.";
  }
};
