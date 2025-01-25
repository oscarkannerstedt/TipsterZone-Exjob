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

export const getMatchOutcome = (
  homeGoals: number,
  awayGoals: number
): string => {
  if (homeGoals > awayGoals) return "1";
  if (homeGoals < awayGoals) return "2";
  return "X";
};

export const getTimeUntilMatch = (utcDate: string): number | null => {
  if (!utcDate) return null;

  const matchStart = new Date(utcDate);
  const now = new Date();
  const timeUntilMatch = (matchStart.getTime() - now.getTime()) / 60000;

  return timeUntilMatch;
};
