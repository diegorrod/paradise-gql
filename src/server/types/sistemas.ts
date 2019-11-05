import { gql } from 'apollo-server-express';
import Paradise from '../database';
import sort from 'fast-sort';

export class SISTEMAS {
  /**
   * Clase de tabla SISTEMAS
   */
  constructor(sisId: number, sisDsc: string) {
    this._SisId = sisId;
    this._SisDsc = sisDsc;
  }

  private _SisId: number;
  public get SisId(): number {
    return this._SisId;
  }
  public set SisId(v: number) {
    this._SisId = v;
  }

  private _SisDsc: string;
  public get SisDsc(): string {
    return this._SisDsc;
  }
  public set SisDsc(v: string) {
    this._SisDsc = v;
  }

  /**
   * Lista todos los registros de la tabla SISTEMAS
   */
  static async listSistemas(OrderBy?): Promise<Array<SISTEMAS>> {
    let result = (await Paradise.Get({
      tabla: 'SISTEMAS',
    })) as Array<SISTEMAS>;

    switch (OrderBy) {
      default: {
        result = sort(result).asc((x: SISTEMAS) => x.SisId);
        break;
      }
      case 'SisDsc': {
        result = sort(result).asc((x: SISTEMAS) => x.SisDsc);
        break;
      }
    }
    return result;
  }

  /**
   * Obtiene el registro con el SisId especificado
   */
  static async getSistemasBySisId(SisId: number): Promise<SISTEMAS> {
    const result = await Paradise.GetOne({
      tabla: 'SISTEMAS',
      consultas: [
        {
          key: 'SisId',
          op: '=',
          value: SisId,
        },
      ],
    });
    return result;
  }
}

export const SISTEMASDef = gql`
  type SISTEMAS {
    SisId: Int
    SisDsc: String
  }
  enum SISTEMASOrderByInput {
    SisId
    SisDsc
  }
`;

export const SISTEMASQueries = {
  listSistemas: async (_, { OrderBy }): Promise<SISTEMAS[]> => await SISTEMAS.listSistemas(OrderBy),
  getSistemasBySisId: async (_, { SisId }): Promise<SISTEMAS> => await SISTEMAS.getSistemasBySisId(SisId),
};
