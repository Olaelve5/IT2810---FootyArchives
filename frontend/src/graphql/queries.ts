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

export const GET_RESULT = gql`
  query GetResult($id: ID!) {
    result(_id: $id) {
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
      comments {
        _id
        user_name
        date
        comment
        result_id
      }
    }
  }
`;

export const GET_GOALSCORERS = gql`
  query GetGoalscorers($home_team: String!, $away_team: String!, $date: String!) {
    goalscorers(home_team: $home_team, away_team: $away_team, date: $date) {
      _id
      date
      home_team
      away_team
      minute
      own_goal
      penalty
      scorer
      team
    }
  }
`;

export const SEARCH_TEAMS = gql`
  query SearchTeams($teamName: String) {
    searchTeams(teamName: $teamName)
  }
`;

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
