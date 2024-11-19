import { gql } from '@apollo/client';

export const SEARCH = gql`
  query Search($searchTerm: String!, $language: String!, $limit: Int!) {
    search(searchTerm: $searchTerm, language: $language, limit: $limit) {
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

export const SEARCH_NATIONS = gql`
  query Search($searchTerm: String!, $language: String!, $limit: Int!) {
    search(searchTerm: $searchTerm, language: $language, limit: $limit) {
      nations {
        en
        no
      }
    }
  }
`

export const SEARCH_TOURNAMENTS = gql`
  query Search($searchTerm: String!, $language: String!, $limit: Int!) {
    search(searchTerm: $searchTerm, language: $language, limit: $limit) {
      tournaments {
        en
        no
      }
    }
  }
`
