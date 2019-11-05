import { gql } from 'apollo-server-express';
import Paradise from '../database';
import sort from 'fast-sort';

export class PERMIGRUPO {
  private _PerGruPerId: number;
  public get PerGruPerId(): number {
    return this._PerGruPerId;
  }
  public set PerGruPerId(v: number) {
    this._PerGruPerId = v;
  }

  private _PrcId: string;
  public get PrcId(): string {
    return this._PrcId;
  }
  public set PrcId(v: string) {
    this._PrcId = v;
  }

  /**
   * Lista todos los registros de la tabla PERMIGRUPO
   */
  static async listPermigrupo(OrderBy?): Promise<Array<PERMIGRUPO>> {
    let result = (await Paradise.Get({
      tabla: 'PERMIGRUPO',
    })) as Array<PERMIGRUPO>;

    switch (OrderBy) {
      default:
        result = sort(result).asc((x: PERMIGRUPO) => x.PerGruPerId);
        break;
      case 'PrcId':
        result = sort(result).asc((x: PERMIGRUPO) => x.PrcId);
        break;
    }
    return result;
  }

  /**
   * Obtiene el registro con el PerGruPerId especificado
   */
  static async getPermigrupoByPerGruPerId(PerGruPerId: number): Promise<Array<PERMIGRUPO>> {
    const result = await Paradise.Get({
      tabla: 'PERMIGRUPO',
      consultas: [
        {
          key: 'PerGruPerId',
          op: '=',
          value: `'${PerGruPerId}'`,
        },
      ],
    });
    return result;
  }
}

export const PERMIGRUPODef = gql`
  type PERMIGRUPO {
    PerGruPerId: Int
    PrcId: String
    Procesos: PROCESOS
  }
  enum PERMIGRUPOOrderByInput {
    PerGruPerId
    PrcId
  }
`;

export const PERMIGRUPOQueries = {
  listPermigrupo: async (_, { OrderBy }): Promise<PERMIGRUPO[]> => {
    return await PERMIGRUPO.listPermigrupo(OrderBy);
  },
  getPermigrupoByPerGruPerId: async (_, { PerGruPerId }): Promise<PERMIGRUPO[]> => {
    return await PERMIGRUPO.getPermigrupoByPerGruPerId(PerGruPerId);
  },
};
