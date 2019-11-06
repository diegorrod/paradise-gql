import { gql } from 'apollo-server-express';
import { GQLExtension } from '../misc/SetServer';
import { Paradise } from '../database';

export class Reservas implements GQLExtension {
  Def = gql`
    type Reserva {
      id: Int
    }
    extend type Query {
      reservas: [Reserva]
    }
  `;
  Query = {
    reservas: async (): Promise<Array<{ ResNro: number }>> => {
      return (await Paradise.Get({ tabla: 'RESERVA' })).data;
    },
  };
  Mutation = {};
  Resolvers = {
    Reserva: {
      id: ({ ResNro }): number => ResNro,
    },
  };
}
