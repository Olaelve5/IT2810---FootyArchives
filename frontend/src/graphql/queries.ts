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


export const GET_NATION_STATS = gql`
  query GetNationStats($limit: Int, $sort: SortInput) {
    nationStats(limit: $limit, sort: $sort) {
      _id
      total_team_games
      total_team_wins
      total_team_draws
      total_team_losses
      total_team_goals_scored
      total_team_goals_conceded
      top_rival {
        opponent
        total_games
        total_wins
        total_draws
        total_losses
        total_goals_scored
        total_goals_conceded
      }
    }
  }
`