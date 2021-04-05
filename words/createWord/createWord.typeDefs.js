import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    createWord(word: String!, meaning: [String], root: String, variation: [String], date: String!): BaseResponse!
  }
`;
