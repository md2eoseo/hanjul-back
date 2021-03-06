import { gql } from 'apollo-server-express';

export default gql`
  type User {
    id: String!
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    bio: String
    avatar: String
    followers: [User]
    following: [User]
    totalPosts: Int!
    totalFollowers: Int!
    totalFollowing: Int!
    isMe: Boolean!
    isFollowing: Boolean!
    isFollowers: Boolean!
    role: Role
    createdAt: String!
    updatedAt: String!
  }
`;
