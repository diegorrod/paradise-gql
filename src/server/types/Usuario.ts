import { gql } from 'apollo-server-express';
import Paradise from '../database';

export interface USUARIO {
  UsuId: string;
  UsuNom: string;
  UsuCla: string;
  UsuAdministrador: string;
}

type QueryUsuario = {};

export class Usuario {
  static async usuario(id: string): Promise<USUARIO> {
    const result = await Paradise.GetOne({
      tabla: 'USUARIOS',
      consultas: [
        {
          key: 'UsuId',
          op: '=',
          value: `'${id}'`,
        },
      ],
    });
    return result;
  }
  static Def = gql`
    type Usuario {
      id: String
      nombre: String
      administrador: Boolean
    }
  `;
  static Query = {
    usuario: async (_, args, context): Promise<QueryUsuario> => {
      const { id } = args;
      const { token } = context;
      const ROL = '110003';
      if (token) {
        console.log(token.roles);
        console.log(token.roles.includes(ROL) || token.roles.includes(ROL));
        if (!(token.roles.includes('admin') || token.roles.includes(ROL))) console.log('SIN AUTORIZACION DE ADMIN');
      } else console.log('SIN TOKEN');
      return await Usuario.usuario(id);
    },
  };
}
