import { gql } from '@apollo/client';

export const GET_RESULTS = gql`
  query Query($sort: SortInput, $limit: Int, $page: Int, $filters: FiltersInput) {
    results(sort: $sort, limit: $limit, page: $page, filters: $filters) {
      results {
        _id
        date
        home_team
        away_team
        home_score
        away_score
        tournament
        city
        country
        neutral
      }
      total
      currentPage
      totalPages
    }
  }
`;

export const SEARCH_TEAMS = gql`
  query SearchTeams($teamName: String) {
    searchTeams(teamName: $teamName)
  }
`;
