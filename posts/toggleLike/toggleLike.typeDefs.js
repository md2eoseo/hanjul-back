import { gql } from 'apollo-server-express';

export default gql`
  type ToggleLikeResult {
    ok: Boolean!
    error: String
    like: Boolean
  }
  type Mutation {
    toggleLike(postId: Int!): ToggleLikeResult!
  }
`;
