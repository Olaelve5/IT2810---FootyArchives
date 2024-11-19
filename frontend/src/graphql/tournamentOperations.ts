import { gql } from '@apollo/client';

export const GET_TOURNAMENTS = gql`
  query GetTournaments($tournamentName: String!, $page: Int!) {
    tournaments(tournamentName: $tournamentName, page: $page) {
      totalCount
      startYear
      endYear
      paginatedResults {
        _id
        year
        tournament
        results {
          _id
          tournament
          home_team
          home_team_no
          away_team
          away_team_no
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