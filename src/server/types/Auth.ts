import { AuthenticationError, gql } from 'apollo-server-express';
import Paradise from '../database';
import sort from 'fast-sort';
import { SetJWTInCookies, GenerateJWT } from '../misc/login';
import { GQLExtension } from '../misc/SetServer';

export class Auth implements GQLExtension {
  Def = gql`
    extend type Query {
      login(user: String, pass: String): Boolean
    }
  `;
  Query = {
    login: async (_, args, { res }): Promise<boolean> => {
      // Extraigo las constantes necesarias para hacer el login
      const { user, pass } = args;
      let userResult;
      let passResult;
      let roles: Array<string> = [];

      // Busco en la DB el usuario
      try {
        userResult = await Paradise.GetOne(
          {
            tabla: 'USUARIOS',
            consultas: [
              {
                key: 'UsuId',
                op: '=',
                value: `'${user}'`,
              },
            ],
          },
          false,
        );
      } catch (error) {
        console.log(error);
      }

      // //El usuario no existe
      if (!userResult) throw new AuthenticationError('usuario no existe');

      // Comparo la contraseña
      try {
        const strArray: Array<string> = Array.from(pass);
        let strArrayCrypt = '';

        strArray.forEach(char => {
          strArrayCrypt += String.fromCharCode(char.charCodeAt(0) + 10);
        });

        passResult = strArrayCrypt === userResult.UsuCla ? true : false;
      } catch (error) {
        console.log(error);
      }

      // // Contraseña incorrecta
      if (!passResult) throw new AuthenticationError('contraseña incorrecta');

      // Obtengo los roles
      const permisos = await Paradise.Get({
        tabla: 'PERMISOS',
        consultas: [
          {
            key: 'PerUsuId',
            op: '=',
            value: `'${user}'`,
          },
        ],
      });

      for (const { PerPrcId } of permisos) {
        if (!roles.includes(PerPrcId)) roles.push(PerPrcId);
      }

      const usuario1 = await Paradise.Get({
        tabla: 'USUARIO1',
        consultas: [
          {
            key: 'UsuId',
            op: '=',
            value: `'${user}'`,
          },
        ],
      });

      for (const { UsuGruPerId } of usuario1) {
        const permigrupo = await Paradise.Get({
          tabla: 'PERMIGRUPO',
          consultas: [
            {
              key: 'PerGruPerId',
              op: '=',
              value: `${UsuGruPerId}`,
            },
          ],
        });
        for (const { PrcId } of permigrupo) {
          if (!roles.includes(PrcId)) roles.push(PrcId);
        }
      }
      roles = sort(roles).asc();

      // Genero el JWT y lo seteo en una cookie
      SetJWTInCookies({
        res,
        authToken: GenerateJWT({ id: userResult.UsuId.toLowerCase(), nombre: userResult.UsuNom.toLowerCase(), roles }),
      });

      // Retorno { id, name }
      return true;
    },
  };
  Mutation = {};
  Resolvers = {};
}

export interface Token {
  roles: string[];
}
