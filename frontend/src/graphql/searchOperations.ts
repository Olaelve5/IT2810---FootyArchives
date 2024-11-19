import { gql } from '@apollo/client';

export const SEARCH = gql`
  query Search($searchTerm: String!, $language: String!) {
    search(searchTerm: $searchTerm, language: $language) {
      nations {
        en
        no
      }
      tournaments {
        en
        no
      }
    }
  }
`;
