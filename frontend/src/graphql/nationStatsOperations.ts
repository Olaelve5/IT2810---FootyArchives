import { gql } from '@apollo/client';

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
`;

// Id is a string -> the name of the nation
export const GET_NATION_STAT = gql`
  query GetNationStat($_id: ID!) {
    nationStat(_id: $_id) {
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
`;
