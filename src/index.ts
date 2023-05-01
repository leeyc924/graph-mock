import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { todoList } from './db/todo';

const port = process.env.PORT || 8006;

const typeDefs = `
  type Item {
    id: String
    title: String
    desc: String
    modId: String
    modDt: String
    regId: String
    regDt: String
  }

  type Query {
    list: [Item]
  }
`;

const resolvers = {
  Query: {
    list: () => todoList,
  },
};

async function configApp() {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  app.use('/', cors<cors.CorsRequest>(), bodyParser.json(), expressMiddleware(server));

  await new Promise<void>(resolve => httpServer.listen({ port }, resolve));
  console.log('Express is listening on port', port);
}

configApp();
