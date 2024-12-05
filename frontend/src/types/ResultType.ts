import { CommentType } from './CommentType';

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
  home_team_no: string;
  away_team_no: string;
};