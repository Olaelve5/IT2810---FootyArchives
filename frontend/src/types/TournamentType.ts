import { ResultType } from './ResultType';

export type TournamentType = {
  _id: string;
  year: number;
  tournament: string;
  results: ResultType[];
};
