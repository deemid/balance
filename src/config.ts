/* eslint-disable import/prefer-default-export */

type IConfig = {
  port: string;
  salt: string;
  jwtSecret: string;
  mongoUri: string;
}

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/balance-activity';

export const config: IConfig = {
  port: process.env.PORT || '3000',
  salt: process.env.SALT || 'sampleSalt',
  jwtSecret: process.env.JWT_SECRET || 'sampleJWTsecret',
  mongoUri,
};
