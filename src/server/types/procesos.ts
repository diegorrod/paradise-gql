import { gql } from 'apollo-server-express';
import Paradise from '../database';
import sort from 'fast-sort';

export class PROCESOS {
  private _PrcId: string;
  public get PrcId(): string {
    return this._PrcId;
  }
  public set PrcId(v: string) {
    this._PrcId = v;
  }

  private _PrcDsc: string;
  public get PrcDsc(): string {
    return this._PrcDsc;
  }
  public set PrcDsc(v: string) {
    this._PrcDsc = v;
  }

  private _Numero: number;
  public get Numero(): number {
    return this._Numero;
  }
  public set Numero(v: number) {
    this._Numero = v;
  }

  private _SisId: number;
  public get SisId(): number {
    return this._SisId;
  }
  public set SisId(v: number) {
    this._SisId = v;
  }

  private _PrcAuditaAlta: string;
  public get PrcAuditaAlta(): string {
    return this._PrcAuditaAlta;
  }
  public set PrcAuditaAlta(v: string) {
    this._PrcAuditaAlta = v;
  }

  private _PrcAuditaBaja: string;
  public get PrcAuditaBaja(): string {
    return this._PrcAuditaBaja;
  }
  public set PrcAuditaBaja(v: string) {
    this._PrcAuditaBaja = v;
  }

  private _PrcAuditaMod: string;
  public get PrcAuditaMod(): string {
    return this._PrcAuditaMod;
  }
  public set PrcAuditaMod(v: string) {
    this._PrcAuditaMod = v;
  }

  private _PrcAuditaCon: string;
  public get PrcAuditaCon(): string {
    return this._PrcAuditaCon;
  }
  public set PrcAuditaCon(v: string) {
    this._PrcAuditaCon = v;
  }

  private _PrcAudObsAlta: string;
  public get PrcAudObsAlta(): string {
    return this._PrcAudObsAlta;
  }
  public set PrcAudObsAlta(v: string) {
    this._PrcAudObsAlta = v;
  }

  private _PrcAudObsBaja: string;
  public get PrcAudObsBaja(): string {
    return this._PrcAudObsBaja;
  }
  public set PrcAudObsBaja(v: string) {
    this._PrcAudObsBaja = v;
  }

  private _PrcAudObsMod: string;
  public get PrcAudObsMod(): string {
    return this._PrcAudObsMod;
  }
  public set PrcAudObsMod(v: string) {
    this._PrcAudObsMod = v;
  }

  private _PrcAudObsCon: string;
  public get PrcAudObsCon(): string {
    return this._PrcAudObsCon;
  }
  public set PrcAudObsCon(v: string) {
    this._PrcAudObsCon = v;
  }

  /**
   * Lista todos los registros de la tabla PROCESOS
   */
  static async listPROCESOS(OrderBy?): Promise<Array<PROCESOS>> {
    let result = (await Paradise.Get({
      tabla: 'PROCESOS',
    })) as Array<PROCESOS>;

    switch (OrderBy) {
      default:
        result = sort(result).asc((x: PROCESOS) => x.PrcId);
        break;
      case 'PrcDsc':
        result = sort(result).asc((x: PROCESOS) => x.PrcDsc);
        break;
      case 'SisId':
        result = sort(result).by([{ asc: 'SisId' }, { asc: 'PrcId' }]);
        break;
    }
    return result;
  }

  /**
   * Obtiene el registro con el PrcId especificado
   */
  static async getPROCESOSByPrcId(PrcId: number): Promise<PROCESOS> {
    const result = await Paradise.GetOne({
      tabla: 'PROCESOS',
      consultas: [
        {
          key: 'PrcId',
          op: '=',
          value: PrcId,
        },
      ],
    });
    return result;
  }
}

export const PROCESOSDef = gql`
  type PROCESOS {
    PrcId: String
    PrcDsc: String
    Numero: Int
    SisId: String
    PrcAuditaAlta: String
    PrcAuditaBaja: String
    PrcAuditaMod: String
    PrcAuditaCon: String
    PrcAudObsAlta: String
    PrcAudObsBaja: String
    PrcAudObsMod: String
    PrcAudObsCon: String
    Sistemas: SISTEMAS
  }

  enum PROCESOSOrderByInput {
    PrcId
    PrcDsc
    SisId
  }
`;

export const PROCESOSQueries = {
  listProcesos: async (_, { OrderBy }): Promise<PROCESOS[]> => await PROCESOS.listPROCESOS(OrderBy),
  getProcesosByPrcId: async (_, { PrcId }): Promise<PROCESOS> => await PROCESOS.getPROCESOSByPrcId(PrcId),
};
