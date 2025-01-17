export interface ITeam {
  name: string;
  shortName: string;
}

export interface IMatch {
  id: number;
  homeTeam: ITeam;
  awayTeam: ITeam;
  match_date: string;
  utcDate: string;
  result?: {
    home: number;
    away: number;
  };
  competion: string;
}
