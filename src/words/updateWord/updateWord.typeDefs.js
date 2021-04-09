import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    updateWord(id: Int!, meaning: [String], root: String, variation: [String], date: String): BaseResponse!
  }
`;
