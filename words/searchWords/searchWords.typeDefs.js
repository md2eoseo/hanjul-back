import { gql } from 'apollo-server-express';

export default gql`
  type SearchWords {
    ok: Boolean!
    error: String
    words: [Word]
  }
  type Query {
    searchWords(word: String, date: String, lastId: Int): SearchWords!
  }
`;
