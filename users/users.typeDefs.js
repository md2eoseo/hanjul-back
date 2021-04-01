import { gql } from 'apollo-server-express';

export default gql`
  type User {
    id: String!
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    bio: String
    avatar: Upload
    followers: [User]
    following: [User]
    totalFollowers: Int!
    totalFollowing: Int!
    isMe: Boolean!
    isFollowing: Boolean!
    isFollowers: Boolean!
    createdAt: String!
    updatedAt: String!
  }
`;
