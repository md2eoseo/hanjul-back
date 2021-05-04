import { gql } from 'apollo-server-express';

export default gql`
  type SeeArchiveResult {
    ok: Boolean!
    error: String
    posts: [Post]
    lastId: Int
  }
  type Query {
    seeArchive(lastId: Int): SeeArchiveResult!
  }
`;
