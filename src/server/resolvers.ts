import { AuthQueries } from './types/Auth';
import { PERMIGRUPOQueries } from './types/permigrupo';
import { PERMISOSQueries } from './types/permisos';
import { PROCESOSQueries, PROCESOS } from './types/procesos';
import { SISTEMASQueries, SISTEMAS } from './types/sistemas';
import { Usuario } from './types/Usuario';

export const resolvers = {
  Query: {
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
