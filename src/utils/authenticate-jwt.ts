import { Request, Response, NextFunction } from 'express';
import { passportConfig } from './passport';

const AuthenticateAuthToken = (req: Request, res: Response, next: NextFunction) => {
  passportConfig.authenticate(
    'jwt',
    { session: false },
    (err: Error, user: any) => {
      if (err || !user) {
        return res.status(401).send({ success: false, error: 'UnAuthorized, ReLogin' });
      }
      req.user = user;
      return next();
    }
    )(req, res, next);
};

export default AuthenticateAuthToken;
