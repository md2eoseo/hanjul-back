import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    createPost(text: String!, wordId: Int!): BaseResponse!
  }
`;
