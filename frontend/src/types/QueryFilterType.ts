import TeamType from './TeamType';

type YearRangeType = {
  startYear: number;
  endYear: number;
};

export type QueryFilterType = {
  teams?: TeamType[];
  tournaments?: string[];
  yearRange?: YearRangeType;
  exclusive?: boolean;
};
