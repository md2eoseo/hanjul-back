import { gql } from 'apollo-server-express';

export default gql`
  type SeeFollowingResponse {
    ok: Boolean!
    error: String
    following: [User]
    lastId: Int
  }
  type Query {
    seeFollowing(username: String!, lastId: Int, pageSize: Int): SeeFollowingResponse
  }
`;
