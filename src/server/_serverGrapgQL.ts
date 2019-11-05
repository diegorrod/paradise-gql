import { PERMISOSDef, PERMISOSQueries } from './types/permisos';
import { PROCESOSDef, PROCESOSQueries, PROCESOS } from './types/procesos';
import { SISTEMASDef, SISTEMASQueries, SISTEMAS } from './types/sistemas';
import { AuthQueries } from './types/Auth';
import { TestDefType, TestQueries } from './types/Test';
import { ApolloServer, gql } from 'apollo-server-express';
import { PERMIGRUPOQueries, PERMIGRUPODef } from './types/permigrupo';
import { Usuario } from './types/Usuario';
import { context, Context } from './misc/context';

const Query = gql`
  type Query {
    login(user: String!, pass: String!): Boolean
    listPermigrupo(OrderBy: PERMIGRUPOOrderByInput): [PERMIGRUPO]
    getPermigrupoByPerGruPerId(PerGruPerId: Int!): [PERMIGRUPO]
    listPermisos(OrderBy: PERMISOSOrderByInput): [PERMISOS]
    getPermisosByPerUsuId(PerUsuId: String!): [PERMISOS]
    listProcesos(OrderBy: PROCESOSOrderByInput): [PROCESOS]
    getProcesosByPrcId(PrcId: String!): PROCESOS
    listSistemas(OrderBy: SISTEMASOrderByInput): [SISTEMAS]
    getSistemasBySisId(SisId: Int!): SISTEMAS
    usuario(id: String!): Usuario
    test: Test
  }
`;
const typeDefs = [PERMIGRUPODef, PERMISOSDef, PROCESOSDef, SISTEMASDef, TestDefType, Usuario.Def, Query];

const resolvers = {
  Query: {
    ...TestQueries,
    ...AuthQueries,
    ...PERMIGRUPOQueries,
    ...PERMISOSQueries,
    ...PROCESOSQueries,
    ...SISTEMASQueries,
    ...Usuario.Query,
  },
  PROCESOS: {
    Sistemas: async ({ SisId }): Promise<SISTEMAS> => {
      return await SISTEMAS.getSistemasBySisId(SisId);
    },
  },
  PERMIGRUPO: {
    Procesos: async ({ PrcId }): Promise<PROCESOS> => {
      console.log('PERMIGRUPO | Procesos');
      return await PROCESOS.getPROCESOSByPrcId(PrcId);
    },
  },
  PERMISOS: {
    Procesos: async ({ PerPrcId }): Promise<PROCESOS> => {
      return await PROCESOS.getPROCESOSByPrcId(PerPrcId);
    },
  },
  Usuario: {
    id: (data): string => data.UsuId,
    nombre: (data): string => data.UsuNom,
    administrador: (data): boolean => (data.UsuAdministrador == 's' ? true : false),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }): Context => context({ req, res }),
});

export function StartServerGraphQL(app): ApolloServer {
  server.applyMiddleware({ app });
  return server;
}
