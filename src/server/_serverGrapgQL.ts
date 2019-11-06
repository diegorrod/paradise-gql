import { Auth } from './types/Auth';
import { Test } from './types/Test';
import { ApolloServer } from 'apollo-server-express';
import { SetServer } from './misc/SetServer';
import { Reservas } from './types/Reservas';

const _gql = [new Test(), new Auth(), new Reservas()];
const server = SetServer(_gql);

export function StartServerGraphQL(app): ApolloServer {
  server.applyMiddleware({ app });
  return server;
}
