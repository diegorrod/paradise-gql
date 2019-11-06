import { gql } from 'apollo-server-express';
import { GQLExtension } from '../misc/SetServer';

export class Test implements GQLExtension {
  // Definicion
  Def = gql`
    type Test {
      message: String
    }

    extend type Query {
      getMessage(text: String): Test
    }

    extend type Mutation {
      setMessage(text: String): Boolean
    }
  `;

  // Query
  Query = {
    getMessage: (root, args): { message: string } => {
      return { message: args.text };
    },
  };

  // Mutation
  Mutation = {
    setMessage: (): boolean => true,
  };

  // Resolvers
  Resolvers = {};
}
