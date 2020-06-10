import { ApolloServer, gql } from 'apollo-server-koa';
import fs from 'fs';
import path from 'path';
import resolvers from './resolvers';

const createApolloServer = (app: any) => {
  const typeDefs = gql`${fs.readFileSync(path.resolve(__dirname, '../', 'schema.gql'), {
    encoding: 'utf8',
  })}`;

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: async (ctx) => {
      const xRequestId = ctx.ctx.request.header['x-request-id'];
      return { xRequestId };
    },
  });
  apolloServer.applyMiddleware({ app });

  return apolloServer;
};

export default createApolloServer;
