import { gql } from 'graphql-tag';

const userTypeDefs = gql`
    type User {
        id: ID!
        username: String!
    }

    type Query {
        getUserById(_id: ID!): User
    }
`

export default userTypeDefs;