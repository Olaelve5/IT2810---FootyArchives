import { YearRange } from './../../types/FiltersType';
import { gql } from "apollo-server";

// Define the GraphQL schema - the types and queries that can be made
const resultTypeDefs = gql`
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
  type Goalscorer {
    _id: ID!
    home_team: String!
    away_team: String!
    minute: Int!
    own_goal: Boolean
    penalty: Boolean
    scorer: String!
    team: String!
    date: String!
  }

  input YearRange {
    startYear: Int!
    endYear: Int!
  }

  input FiltersInput {
    teams: [String]
    tournaments: [String]
    yearRange: YearRange
  }

  input SortInput {
    field: String!
    order: Int!
  }

  type PaginatedResults {
    results: [Result]
    total: Int
    currentPage: Int
    totalPages: Int
  }

  type Tournament {
    _id: String!
    year: Int!
    tournament: String!
    results: [Result!]!
  }

  type Query {
    results(
      filters: FiltersInput
      sort: SortInput
      limit: Int
      page: Int
    ): PaginatedResults
    result(_id: ID!): Result!
    searchTeams(teamName: String): [String]
    goalscorers(
      home_team: String!
      away_team: String!
      date: String!
    ): [Goalscorer]
    tournaments(tournamentName: String!, page: Int!): [Tournament!]!
  }
`;

export default resultTypeDefs;
