import { QuerySortType } from '../types/QuerySortType';


export const recentResultsSort: QuerySortType = {
  field: 'date',
  order: -1,
};

export const biggestWinsSort: QuerySortType = {
  field: 'goal_difference',
  order: -1,
};

export const nationStatsSort: QuerySortType = {
  field: 'total_team_wins',
  order: -1,
};
