import { gql } from 'graphql-tag';


// Define the GraphQL schema - the types and queries that can be made
const nationStatTypeDefs = gql`
    type NationStat {
        _id: ID!
        name_no: String!
        code: String!
        total_team_games: Int!
        total_team_wins: Int!
        total_team_draws: Int!
        total_team_losses: Int!
        total_team_goals_scored: Int!
        total_team_goals_conceded: Int!
        top_rival: TopRival!
    }

    type TopRival {
        opponent: String!
        name_no: String!
        code: String!
        total_games: Int!
        total_wins: Int!
        total_draws: Int!
        total_losses: Int!
        total_goals_scored: Int!
        total_goals_conceded: Int!
    }

    input SortInput {
        field: String!
        order: Int!
    }

    extend type Query {
        nationStats(limit: Int, sort: SortInput): [NationStat]
        nationStat(_id: ID!): NationStat
    }
`


export default nationStatTypeDefs;