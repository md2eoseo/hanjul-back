import { gql } from 'apollo-server-express';

export default gql`
  type CreateAccountResponse {
    ok: Boolean!
    error: String
    username: String
  }
  type Mutation {
    createAccount(
      firstName: String!
      lastName: String!
      username: String!
      email: String!
      password: String!
      role: Role
    ): CreateAccountResponse!
  }
`;
