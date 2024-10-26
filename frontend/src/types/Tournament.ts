import { ResultType } from './Result';

export type TournamentType = {
  _id: string;
  year: number;
  tournament: string;
  results: ResultType[];
};
