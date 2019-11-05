import { Token, SetJWTInCookies, GenerateJWT } from './login';
import e = require('express');
import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from '../../const';

export interface Context {
  req: e.Request;
  res: e.Response;
  token: Token;
}

export function context({ res, req }): Context {
  let token;
  if (req.cookies['auth-token']) {
    try {
      token = verify(req.cookies['auth-token'], JWT_SECRET);
      SetJWTInCookies({
        res,
        authToken: GenerateJWT(token),
      });
    } catch (error) {
      switch (error.name) {
        case 'TokenExpiredError': {
          break;
        }
        default: {
          console.log(error);
          break;
        }
      }
    }
  }
  return {
    req,
    res,
    token,
  };
}
