import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    updatePassword(oldPassword: String, newPassword: String): BaseResponse!
  }
`;
