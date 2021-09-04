import { gql } from 'apollo-server-express';

export default gql`
  type SeeArchiveResponse {
    ok: Boolean!
    error: String
    posts: [Post]
    lastId: Int
  }
  type Query {
    seeArchive(lastId: Int, pageSize: Int): SeeArchiveResponse!
  }
`;
