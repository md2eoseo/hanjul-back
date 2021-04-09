import { gql } from 'apollo-server-express';

export default gql`
  type SeeFeedResult {
    ok: Boolean!
    error: String
    posts: [Post]
  }
  type Query {
    seeFeed(lastId: Int): SeeFeedResult!
  }
`;
