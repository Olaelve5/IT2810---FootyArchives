import { ResultType } from './Result';

export type TournamentType = {
  _id: string;
  tournament: string;
  results: ResultType[];
};
