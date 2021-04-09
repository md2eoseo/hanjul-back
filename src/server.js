require('dotenv').config();
import express from 'express';
import logger from 'morgan';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './schema';
import { getLoggedInUser } from './users/users.utils';

const PORT = process.env.PORT;

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
  context: async ({ req }) => {
    return { loggedInUser: await getLoggedInUser(req.headers.authorization) };
  },
});

const app = express();
app.use(logger('tiny'));
apollo.applyMiddleware({ app });

app.listen({ port: PORT }, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql ✅`);
});
