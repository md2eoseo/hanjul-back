import { gql } from 'apollo-server-express';

export default gql`
  type Word {
    id: Int!
    word: String!
    meaning: [String]
    root: String
    variation: [String]
    date: String!
    createdAt: String!
    updatedAt: String!
  }
`;
