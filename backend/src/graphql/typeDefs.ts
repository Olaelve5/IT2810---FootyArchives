import { gql } from 'apollo-server'

module.exports = gql`
type Matchup {
    id: ID!
    date: String
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
    matchups(amount: Int): [Matchup]
    matchup(id: ID!): Matchup
}



`