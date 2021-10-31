export const { NODE_ENV = 'development', APP_PORT = 3000 } = process.env;

export const PROD = NODE_ENV === 'production';

export const BCRYPT_SALT_LENGTH = 12;
