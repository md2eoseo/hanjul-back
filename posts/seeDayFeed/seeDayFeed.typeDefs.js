import { gql } from 'apollo-server-express';

export default gql`
  type SeeDayFeedResult {
    ok: Boolean!
    error: String
    posts: [Post]
  }
  type Query {
    seeDayFeed(lastId: Int): SeeDayFeedResult!
  }
`;
