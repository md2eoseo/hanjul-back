import { gql } from 'apollo-server-express';

export default gql`
  type CreateAccountResult {
    ok: Boolean!
    error: String
    username: String
  }
  type Mutation {
    createAccount(firstName: String!, lastName: String!, username: String!, email: String!, password: String!): CreateAccountResult!
  }
`;
