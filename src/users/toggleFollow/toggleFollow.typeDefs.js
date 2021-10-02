import { gql } from 'apollo-server-express';

export default gql`
  type ToggleFollowResponse {
    ok: Boolean!
    error: String
    follow: Boolean
  }
  type Mutation {
    toggleFollow(username: String!): ToggleFollowResponse!
  }
`;
