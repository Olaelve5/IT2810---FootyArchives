import { gql } from 'graphql-tag';

// Define the GraphQL schema - the types and queries that can be made
const commentTypeDefs = gql`
  type Comment {
    user_name: String!
    date: String!
    comment: String!
    result_id: ID!
    user_id: ID!
  }
  type CommentResponse {
    comments: [Comment]
    totalCount: Int
    totalPages: Int
  }
  type Query {
    getComments(result_id: ID!, limit: Int, page: Int): CommentResponse!
  }

  type Mutation {
    addComment(result_id: ID!, comment: String!, username: String!, user_id: String!): Comment!
  }
`;

export default commentTypeDefs;
