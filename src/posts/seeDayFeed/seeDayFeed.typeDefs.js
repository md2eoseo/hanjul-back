import { gql } from 'apollo-server-express';

export default gql`
  type SeeDayFeedResponse {
    ok: Boolean!
    error: String
    posts: [Post]
    lastId: Int
  }
  type Query {
    seeDayFeed(date: String!, lastId: Int, pageSize: Int): SeeDayFeedResponse!
  }
`;
