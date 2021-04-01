import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    updateProfile(
      firstName: String
      lastName: String
      username: String
      email: String
      password: String
      bio: String
      avatar: Upload
    ): BaseResponse!
  }
`;
