import { gql } from 'apollo-server-express';

export default gql`
  type SearchUsersResult {
    ok: Boolean!
    error: String
    users: [User]
    lastId: Int
  }
  type Query {
    searchUsers(keyword: String!, lastId: Int, pageSize: Int): SearchUsersResult!
  }
`;
