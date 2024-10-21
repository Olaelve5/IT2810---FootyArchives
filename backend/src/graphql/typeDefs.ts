import { gql } from 'apollo-server';

// Define the GraphQL schema - the types and queries that can be made
const typeDefs = gql`
  type Result {
    _id: ID!
    date: String!
    home_team: String!
    away_team: String!
    home_score: Int!
    away_score: Int!
    tournament: String!
    city: String
    country: String
    neutral: Boolean
  }

  type Query {
    results(amount: Int): [Result]
    result(_id: ID!): Result!
    searchTeams(teamName: String): [String]
  }
`;

export default typeDefs;