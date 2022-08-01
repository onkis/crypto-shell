//const debug = require('debug')('crypto-shell:server');
import 'dotenv/config';
import dbg from 'debug';
const debug = dbg('crypto-shell:server')
import http from 'http';

import createError from 'http-errors';
import express from 'express';
import path from 'path';
import  cookieParser from 'cookie-parser';
import logger from 'morgan';
import routes from './api/routes.mjs';
import { handleStaticAssets } from './lib/middleware.mjs';
import expSession from "express-session";
//import ConnectRedis from 'connect-redis';
import {sqliteSession} from './lib/sqlite_session.mjs';
import { db, KVStore } from './db/db.mjs';
import {banBadActors} from './lib/rate_limit.mjs';

import {main as backgroundJobs} from './lib/background.mjs';

const SqliteStore = sqliteSession(expSession); //TOOD put this in the sqlite_session.mjs file...

//to replace __dirname
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';
// const __dirname = dirname(fileURLToPath(import.meta.url));
const __dirname = path.dirname(process.argv[1]);


const app = express();

app.disable('x-powered-by');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//TODO: find an alt logger?
app.use(logger('dev'));

let cookieSettings = {
  httpOnly: true,
  secure: false, //TODO: run ssl in dev? 
  maxAge: (1000*60*60*4), //4 hour cookie
};

if(process.env.NODE_ENV === 'production'){
  cookieSettings.secure = true;
  cookieSettings.domain = process.env.BASE_URL;
}

app.use(expSession({
  secret: process.env.COOKIE_SECRET, //TOOD: pass an array and rotate secret
  cookie: cookieSettings,
  name: 'rotipay.sid',
  proxy: (process.env.NODE_ENV === 'production' ? true : false),
  store: new SqliteStore({ client: KVStore }),
  resave: false,
  saveUninitialized: false
}));

app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(banBadActors);

//all the /public routes..
app.use(handleStaticAssets)

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



/**
 * use .env for secrets
 */
var port = process.env.PORT || '3000';
app.set('port', port);


function main(){
  
  /**
   * Create HTTP server.
   */
  
  var server = http.createServer(app);
  
  /**
   * Listen on provided port, on all network interfaces.
   */
  
  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);
  
  /**
   * Event listener for HTTP server "error" event.
   */
  
  function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }
  
    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;
  
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }
  
  /**
   * Event listener for HTTP server "listening" event.
   */
  
  function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }
  
  /**
   * Run jobs on setInterval Cadences
   */
   backgroundJobs();

}
main();
