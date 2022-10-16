import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type User {
    id: Int!
    email: String!
    password: String!
  }

  type Tokens {
    access: String!
    refresh: String!
  }

  type Mutation {
    signin(email: String!, password: String!): Tokens
    signup(email: String!, password: String!): Tokens
    refresh: Tokens
  }

  type Query {
    user: User
    users: [User]
  }
`;

export default typeDefs