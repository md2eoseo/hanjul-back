import { gql } from 'apollo-server-express';

export default gql`
  type SeeUserPostsResponse {
    ok: Boolean!
    error: String
    posts: [Post]
    lastId: Int
  }
  type Query {
    seeUserPosts(username: String!, lastId: Int, pageSize: Int): SeeUserPostsResponse!
  }
`;
