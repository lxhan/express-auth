import mongoose from 'mongoose';
import Redis from 'ioredis';
import connectRedis from 'connect-redis';
import session from 'express-session';
import { createApp } from './app';
import { REDIS_OPTIONS, APP_PORT, MONGO_URL } from './config';

(async () => {
  await mongoose.connect(MONGO_URL);

  const RedisStore = connectRedis(session);

  const client = new Redis(REDIS_OPTIONS);

  const store = new RedisStore({ client });

  const app = createApp(store);

  app.listen(APP_PORT, () => console.log(`Listening on port ${APP_PORT}`));
})();
