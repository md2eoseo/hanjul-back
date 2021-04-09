import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    deleteWord(id: Int!): BaseResponse!
  }
`;
