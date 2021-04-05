import { gql } from 'apollo-server-express';

export default gql`
  type Post {
    id: Int!
    text: String!
    author: User!
    authorId: Int!
    word: Word!
    wordId: Int!
    isMine: Boolean!
    createdAt: String!
    updatedAt: String!
  }
`;
