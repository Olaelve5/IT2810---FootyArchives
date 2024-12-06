export type YearRange = {
  startYear: number;
  endYear: number;
};

export type Filters = {
  teams?: string[];
  tournaments?: string[];
  yearRange?: YearRange;
  winningTeam?: string;
  losingTeam?: string;
  exclusive?: boolean;
};

export type SortInput = {
  field: string;
  order: number;
};
