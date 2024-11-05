import { gql } from 'graphql-tag';

// Define the GraphQL schema - the types and queries that can be made
const commentTypeDefs = gql`
  type Comment {
    user_name: String!
    date: String!
    comment: String!
    result_id: ID!
  }

  type Query {
    getComments(result_id: ID!, limit: Int, page: Int): [Comment]
  }

  type Mutation {
    addComment(result_id: ID!, comment: String!, user_name: String!): Comment!
  }
`;

export default commentTypeDefs;
