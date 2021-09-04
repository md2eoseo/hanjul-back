import { gql } from 'apollo-server-express';

export default gql`
  type SeeMyProfileResponse {
    ok: Boolean!
    error: String
    user: User
  }
  type Query {
    seeMyProfile: SeeMyProfileResponse!
  }
`;
