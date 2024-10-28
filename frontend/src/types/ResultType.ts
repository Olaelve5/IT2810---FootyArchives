export type ResultType = {
  _id: string;
  home_team: string;
  away_team: string;
  HometeamFlag?: string;
  AwayteamFlag?: string;
  home_score: number;
  away_score: number;
  date: string;
  tournament: string;
  city: string;
  country: string;
  neutral?: boolean;
  comments?: CommentType[];
};

export type CommentType = {
  id?: string;
  user_name: string;
  comment: string;
  date: string;
  result_id: string;
};
