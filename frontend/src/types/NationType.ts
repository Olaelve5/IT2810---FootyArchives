export type NationType = {
  _id: string;
  name_no: string;
  total_team_games: number;
  total_team_wins: number;
  total_team_draws: number;
  total_team_losses: number;
  total_team_goals_scored: number;
  total_team_goals_conceded: number;
  top_rival: TopRivalType;
};

export type TopRivalType = {
  opponent: string;
  name_no: string;
  total_games: number;
  total_wins: number;
  total_draws: number;
  total_losses: number;
  total_goals_scored: number;
  total_goals_conceded: number;
};
