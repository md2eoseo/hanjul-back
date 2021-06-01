import { gql } from 'apollo-server-express';

export default gql`
  type SeeUserPostsResult {
    ok: Boolean!
    error: String
    posts: [Post]
    lastId: Int
  }
  type Query {
    seeUserPosts(authorId: Int!, lastId: Int): SeeUserPostsResult!
  }
`;
