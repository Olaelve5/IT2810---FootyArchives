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
