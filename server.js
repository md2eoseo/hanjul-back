require('dotenv').config();
import express from 'express';
import logger from 'morgan';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './schema';

const PORT = process.env.PORT;

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();
app.use(logger('tiny'));
apollo.applyMiddleware({ app });

app.listen({ port: PORT }, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql ✅`);
});
