/* eslint-disable @typescript-eslint/no-explicit-any */
import sql, { Request } from 'mssql';
import { DB_USER, DB_PASS, DB_SERVER, DB_DATABASE_PARADISE } from './../../const';

export interface Query {
  tabla: string;
  consultas?: {
    key?: string;
    op: string;
    value?: any;
  }[];
}

export interface QueryInfo {
  totalRows: number;
  page: number;
  pageRows: number;
  rowsPerPage: number;
  pages: number;
}

export class Paradise {
  // Variable estatica de la base de datos
  private static paradiseDB: Request;

  // Obtener el objeto request de la base de datos
  // o generar nuevo a partir de una nueva conexión a la base de datso
  private static async Request(): Promise<Request> {
    if (Paradise.paradiseDB) return Paradise.paradiseDB;
    try {
      const cnnPool = new sql.ConnectionPool({
        user: DB_USER,
        password: DB_PASS,
        server: DB_SERVER,
        database: DB_DATABASE_PARADISE,
      });
      const db = await cnnPool.connect();
      Paradise.paradiseDB = db.request();
      return Paradise.paradiseDB;
    } catch (error) {
      console.log(error);
    }
  }

  // Ejecutar nueva consulta en la base de datos
  private static async ExectuteQuery(q: Query): Promise<{ result: sql.IResult<{}>; info: QueryInfo }> {
    const { tabla, consultas } = q;
    let infoCountQuery = `
      SELECT COUNT(*) as count
      FROM ${q.tabla}
    `;
    let query = `select * from ${tabla}`;
    if (consultas) {
      let queryWhere = ' where';
      consultas.map(item => {
        if (item.key && item.op && item.value) {
          queryWhere += ` ${item.key} ${item.op} ${item.value}`;
        } else if (item.op) {
          queryWhere += ` ${item.op}`;
        }
      });
      query += queryWhere;
      infoCountQuery += queryWhere;
    }
    const request = await Paradise.Request();
    const result = await request.query(query);
    const info: QueryInfo = {
      totalRows: (await request.query(infoCountQuery)).recordset[0].count,
      page: 1,
      pageRows: 0,
      pages: 1,
      rowsPerPage: 0,
    };
    console.log(info);
    return {
      result,
      info,
    };
  }

  // Obtener valores de una tabla basados en una consulta
  public static async Get(q: Query): Promise<{ data: any[]; info: QueryInfo }> {
    try {
      const { result, info } = await this.ExectuteQuery(q);

      if (result.recordset.length === 0) return { data: [], info };

      const data = [];

      result.recordset.forEach(record => {
        const recordData = {};

        Object.entries(record).forEach(element => {
          if (typeof element[1] === 'string') {
            element[1] = element[1].trim().toLowerCase();
          }
          recordData[element[0]] = element[1];
        });

        data.push(recordData);
      });

      return { data, info };
    } catch (error) {
      console.log(error);
    }
  }

  // Obtener un valor de una tabla basado en una consulta
  public static async GetOne(q: Query, toLowerCase = true): Promise<{ data: any; info: QueryInfo }> {
    try {
      const { result, info } = await this.ExectuteQuery(q);

      if (result.recordset.length === 0) return undefined;

      const data = {};

      Object.entries(result.recordset[0]).forEach(element => {
        if (typeof element[1] === 'string') {
          let el = element[1];
          el = el.trim();
          if (toLowerCase) {
            el = el.toLowerCase();
          }
          element[1] = el;
        }
        data[element[0]] = element[1];
      });

      return { data, info };
    } catch (error) {
      console.log(error);
    }
  }
}

export default Paradise;
