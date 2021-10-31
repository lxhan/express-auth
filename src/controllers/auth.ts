import { Request, Response } from 'express';
import { SigninDto, SignupDto } from '../validation';
import User from '../models/user';
import { BadRequest, Unauthorized } from '../errors';
import { SESSION_NAME } from '../config';

export const isSignedIn = (req: Request) => !!req.session.userId;

export const refreshSession = (req: Request, userId: string) => {
  req.session.userId = userId;
};

export const signUp = async (params: SignupDto): Promise<string> => {
  const found = await User.findOne({ email: params.email });
  if (found) {
    throw new BadRequest('Invalid email');
  }

  const user = await User.create({
    email: params.email,
    password: params.password,
    name: params.name,
  });

  return user.id;
};

export const signIn = async (params: SigninDto): Promise<string> => {
  const user = await User.findOne({ email: params.email });

  if (!user || (await user.comparePassword(params.password))) {
    throw new Unauthorized('Incorrect email or password');
  }

  return user.id;
};

export const signOut = async (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      throw new Error(err.message);
    }

    res.clearCookie(SESSION_NAME);
  });
};
