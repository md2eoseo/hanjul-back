import { gql } from 'apollo-server-express';

export default gql`
  type SeeLikesResponse {
    ok: Boolean!
    error: String
    users: [User]
  }
  type Query {
    seeLikes(postId: Int!): SeeLikesResponse!
  }
`;
