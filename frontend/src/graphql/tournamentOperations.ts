import { gql } from '@apollo/client';

export const GET_TOURNAMENTS = gql`
  query GetTournaments($tournamentName: String!, $page: Int!) {
    tournaments(tournamentName: $tournamentName, page: $page) {
      totalCount
      paginatedResults {
        _id
        year
        tournament
        results {
          _id
          tournament
          home_team
          away_team
          home_score
          away_score
          city
          country
          date
        }
      }
    }
  }
`;

export const SEARCH_TOURNAMENTS = gql`
  query SearchTournaments($tournamentName: String!) {
    searchTournaments(tournamentName: $tournamentName)
  }
`;
