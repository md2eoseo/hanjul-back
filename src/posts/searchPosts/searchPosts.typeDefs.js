import { gql } from 'apollo-server-express';

export default gql`
  type SearchPostsResponse {
    ok: Boolean!
    error: String
    posts: [Post]
    lastId: Int
  }
  type Query {
    searchPosts(keyword: String!, lastId: Int, pageSize: Int): SearchPostsResponse!
  }
`;
