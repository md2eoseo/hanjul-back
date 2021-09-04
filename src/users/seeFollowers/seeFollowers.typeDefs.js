import { gql } from 'apollo-server-express';

export default gql`
  type SeeFollowersResponse {
    ok: Boolean!
    error: String
    followers: [User]
    lastId: Int
  }
  type Query {
    seeFollowers(username: String!, lastId: Int, pageSize: Int): SeeFollowersResponse!
  }
`;
