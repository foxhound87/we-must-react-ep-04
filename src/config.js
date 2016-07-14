import dotenv from 'dotenv';
import getenv from 'getenv';
import path from 'path';

// load env file
dotenv.config();

const Config = getenv.multi({
  env: 'NODE_ENV',
  host: 'SERVER_HOST',
  port: 'SERVER_PORT',
});

const Dir = {
  src: path.resolve(__dirname),
  views: path.resolve(__dirname, 'views'),
  public: path.resolve(__dirname, '..', 'public'),
  build: path.resolve(__dirname, '..', 'public', 'build'),
  static: path.resolve(__dirname, '..', 'public', 'static'),
};

export { Config, Dir };
