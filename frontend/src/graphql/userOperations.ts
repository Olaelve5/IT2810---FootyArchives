import { gql } from '@apollo/client';

export const GET_USER_BY_ID = gql`
  query getUserById($_id: ID!) {
    getUserById(_id: $_id) {
      id
      username
    }
  }
`;
