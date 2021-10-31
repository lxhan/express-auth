import { NextFunction, Request, Response } from 'express';
import { BadRequest } from '../errors';

export const guest = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.session.userId) {
      throw new BadRequest('Already signed in');
    }

    return next();
  } catch (err: any) {
    return res
      .status(err.status || 400)
      .send({ message: err.message || 'Bad request' });
  }
};

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.session.userId) {
      throw new BadRequest('Not signed in');
    }

    return next();
  } catch (err: any) {
    return res
      .status(err.status || 400)
      .send({ message: err.message || 'Bad request' });
  }
};
