import { gql } from 'apollo-server-express';

export default gql`
  type SeeFeedResult {
    ok: Boolean!
    error: String
    posts: [Post]
    lastId: Int
  }
  type Query {
    seeFeed(lastId: Int): SeeFeedResult!
  }
`;
