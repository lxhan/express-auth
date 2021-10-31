import { SessionOptions } from 'express-session';
import { PROD } from '.';

const THIRTY_MINS = 1000 * 60 * 30;

export const {
  SESSION_SECRET = 'pass',
  SESSION_NAME = 'sid',
  SESSION_IDLE_TIMEOUT = THIRTY_MINS,
} = process.env;

export const SESSION_OPTIONS: SessionOptions = {
  secret: SESSION_SECRET,
  name: SESSION_NAME,
  cookie: {
    maxAge: +SESSION_IDLE_TIMEOUT,
    secure: PROD,
    sameSite: true,
  },
  rolling: true,
  resave: false,
  saveUninitialized: false,
};
