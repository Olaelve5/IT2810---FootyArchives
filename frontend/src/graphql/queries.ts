import { gql } from '@apollo/client';

export const GET_RESULTS = gql`
  query GetResults($amount: Int) {
    results(amount: $amount) {
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
