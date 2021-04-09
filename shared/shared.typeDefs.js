import { gql } from 'apollo-server-express';

export default gql`
  type BaseResponse {
    ok: Boolean!
    error: String
  }

  enum Role {
    ADMIN
    AUTHOR
  }
`;
