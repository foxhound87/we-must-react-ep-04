import isDev from 'isdev';
import http from 'http';
import express from 'express';
import serveStatic from 'serve-static';

import { Config, Dir } from './config';
import { logServerConfig } from './logger';

import { hotMiddleware } from './middleware/hot';
import { isoMiddleware } from './middleware/iso';

const app = express();
const server = http.createServer(app);

// use ejs template engine on express
app
  .set('view engine', 'ejs')
  .set('views', Dir.views);

// loading the hot-middleware
if (isDev) app.use(hotMiddleware);

app
  .use('/build', serveStatic(Dir.build))
  .use('/static', serveStatic(Dir.static))
  .use(isoMiddleware);

server
    .listen(
      Config.port,
      Config.host,
    (err) => logServerConfig(err));
