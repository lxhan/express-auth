import express from 'express';
import session, { Store } from 'express-session';
import { SESSION_OPTIONS } from './config';
import { auth } from './routes';
import * as types from './types';

export const createApp = (store: Store) => {
  const app = express();

  app.use(express.json());
  app.use(
    session({
      ...SESSION_OPTIONS,
      store,
    })
  );

  app.use(auth);

  app.use((_, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  app.use((_, res) => {
    res.status(500).json({ message: 'Internal server error' });
  });

  return app;
};
