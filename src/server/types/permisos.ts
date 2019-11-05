import { gql } from 'apollo-server-express';
import Paradise from '../database';
import sort from 'fast-sort';

export class PERMISOS {
  private _PerUsuId: number;
  public get PerUsuId(): number {
    return this._PerUsuId;
  }
  public set PerUsuId(v: number) {
    this._PerUsuId = v;
  }

  private _PerPrcId: string;
  public get PerPrcId(): string {
    return this._PerPrcId;
  }
  public set PerPrcId(v: string) {
    this._PerPrcId = v;
  }

  /**
   * Lista todos los registros de la tabla PERMISOS
   */
  static async listPermisos(OrderBy?): Promise<Array<PERMISOS>> {
    let result = (await Paradise.Get({
      tabla: 'PERMISOS',
    })) as Array<PERMISOS>;

    switch (OrderBy) {
      default:
        result = sort(result).asc((x: PERMISOS) => x.PerUsuId);
        break;
      case 'PerPrcId':
        result = sort(result).asc((x: PERMISOS) => x.PerPrcId);
        break;
    }
    return result;
  }

  /**
   * Obtiene el registro con el PerUsuId especificado
   */
  static async getPermisosByPerUsuId(PerUsuId: number): Promise<Array<PERMISOS>> {
    const result = await Paradise.Get({
      tabla: 'PERMISOS',
      consultas: [
        {
          key: 'PerUsuId',
          op: '=',
          value: `'${PerUsuId}'`,
        },
      ],
    });
    return result;
  }
}

export const PERMISOSDef = gql`
  type PERMISOS {
    PerUsuId: String
    PerPrcId: String
    Procesos: PROCESOS
  }
  enum PERMISOSOrderByInput {
    PerUsuId
    PerPrcId
  }
`;

export const PERMISOSQueries = {
  listPermisos: async (_, { OrderBy }): Promise<PERMISOS[]> => {
    return await PERMISOS.listPermisos(OrderBy);
  },
  getPermisosByPerUsuId: async (_, { PerUsuId }): Promise<PERMISOS[]> => {
    return await PERMISOS.getPermisosByPerUsuId(PerUsuId);
  },
};
