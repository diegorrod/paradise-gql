import { Response } from 'express-serve-static-core';
import { JWT_SECRET } from './../../const';
import { sign } from 'jsonwebtoken';
import ms from 'ms';

export interface Token {
  id: string;
  nombre: string;
  roles: Array<string>;
}

export function GenerateJWT(params: Token): string {
  const { id, nombre, roles } = params;
  const payload = { id, nombre, roles };
  return sign(payload, JWT_SECRET, { expiresIn: '15min' });
}

export function SetJWTInCookies(params: { res: Response; authToken: string }): void {
  const { res, authToken } = params;
  res.cookie('auth-token', authToken, { maxAge: ms('15min') });
}
