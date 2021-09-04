import { gql } from 'apollo-server-express';

export default gql`
  type SeeWordResponse {
    ok: Boolean!
    error: String
    word: Word
  }
  type Query {
    seeWord(id: Int!): SeeWordResponse!
  }
`;
