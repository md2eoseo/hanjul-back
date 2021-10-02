import { gql } from 'apollo-server-express';

export default gql`
  type SearchWordsResponse {
    ok: Boolean!
    error: String
    words: [Word]
    lastId: Int
  }
  type Query {
    searchWords(word: String, date: String, lastId: Int, pageSize: Int): SearchWordsResponse!
  }
`;
