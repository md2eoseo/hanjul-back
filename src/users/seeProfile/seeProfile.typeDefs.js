import { gql } from 'apollo-server-express';

export default gql`
  type SeeProfileResponse {
    ok: Boolean!
    error: String
    user: User
  }
  type Query {
    seeProfile(username: String!): SeeProfileResponse!
  }
`;
