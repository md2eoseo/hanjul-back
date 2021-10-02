import { gql } from 'apollo-server-express';

export default gql`
  type SeePostResponse {
    ok: Boolean!
    error: String
    post: Post
  }
  type Query {
    seePost(id: Int!): SeePostResponse!
  }
`;
