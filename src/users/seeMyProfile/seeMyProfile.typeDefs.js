import { gql } from 'apollo-server-express';

export default gql`
  type SeeMyProfileResult {
    ok: Boolean!
    error: String
    user: User
  }
  type Query {
    seeMyProfile: SeeMyProfileResult!
  }
`;
