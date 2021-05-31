import { gql } from 'apollo-server-express';

export default gql`
  type SeeDayFeedResult {
    ok: Boolean!
    error: String
    posts: [Post]
    lastId: Int
  }
  type Query {
    seeDayFeed(date: String!, lastId: Int): SeeDayFeedResult!
  }
`;
