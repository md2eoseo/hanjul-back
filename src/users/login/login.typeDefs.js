import { gql } from 'apollo-server-express';

export default gql`
  type LoginResponse {
    ok: Boolean!
    error: String
    token: String
  }
  type Mutation {
    login(username: String!, password: String!): LoginResponse!
  }
`;
