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
  status: string;
}

export interface IMatchPrediction {
  _id: string;
  id: string;
  user_id: string;
  match_id: number;
  match?: IMatch;
  predicted_outcome: string;
  summary?: string;
  created_at: string;
}

export interface IDatabaseMatch {
  _id: string;
  match_id: number;
  team_home: string;
  team_away: string;
  match_date: string;
  status: string;
  competition: string;
  result?: {
    home: number;
    away: number;
  };
}
