import { gql } from 'apollo-server-express';

export default gql`
  type SeePostResult {
    ok: Boolean!
    error: String
    post: Post
  }
  type Query {
    seePost(id: Int!): SeePostResult!
  }
`;
