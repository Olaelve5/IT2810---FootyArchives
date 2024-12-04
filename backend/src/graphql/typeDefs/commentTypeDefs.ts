import { gql } from "graphql-tag";

// Define the GraphQL schema - the types and queries that can be made
const commentTypeDefs = gql`
  type User {
    id: ID!
    username: String!
  }

  type Comment {
    id: ID!
    date: String!
    comment: String!
    result_id: ID!
    user: User!
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
    addComment(
      result_id: ID!
      comment: String!
      username: String!
      user_id: String
    ): Comment!

    deleteComment(comment_id: ID!): Boolean!
    editComment(comment_id: ID!, comment: String!): Comment!
  }
`;

export default commentTypeDefs;
