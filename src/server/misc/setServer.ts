import { AE_API_KEY } from './../../const';
import { merge } from 'lodash';
import { ApolloServer, gql } from 'apollo-server-express';
import { Context, context } from './context';
import pjson from '../../../package.json';

export interface GQLExtension {
  Def;
  Query;
  Mutation;
  Resolvers;
}

class Base implements GQLExtension {
  Def = gql`
    type Info {
      appVersion: String
    }
    type Query {
      info: Info
    }
    type Mutation {
      info: String
    }
  `;
  Query = {
    info: (): {
      appVersion: string;
    } => {
      return {
        appVersion: pjson.version,
      };
    },
  };
  Mutation = {};
  Resolvers = {};
}

export function SetServer(_gql: Array<GQLExtension>): ApolloServer {
  const base = new Base();

  const typeDefs = [base.Def];
  let resolvers = {
    Query: { ...base.Query },
    Mutation: {},
  };

  for (const item of _gql) {
    typeDefs.push(item.Def);
    resolvers.Query = merge(resolvers.Query, item.Query);
    resolvers.Mutation = merge(resolvers.Mutation, item.Mutation);
    resolvers = merge(resolvers, item.Resolvers);
  }

  console.log(AE_API_KEY);
  return new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }): Context => context({ req, res }),
    engine: {
      apiKey: AE_API_KEY,
    },
  });
}
