export interface ITeam {
  name: string;
  shortName: string;
}

export interface IMatch {
  match_id: number;
  homeTeam: ITeam;
  awayTeam: ITeam;
  match_date: string;
  result?: {
    home: number;
    away: number;
  };
  competion: string;
}
