//const debug = require('debug')('crypto-shell:server');
import dbg from 'debug';
const debug = dbg('crypto-shell:server')
import http from 'http';

import createError from 'http-errors';
import express from 'express';
import path from 'path';
import  cookieParser from 'cookie-parser';
import logger from 'morgan';
import routes from './api/routes.js';
import { exec } from 'child_process';

//to replace __dirname
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';
// const __dirname = dirname(fileURLToPath(import.meta.url));
const __dirname = path.dirname(process.argv[1]);

import { pg } from './db/db.mjs'


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));

app.use(express.json({limit: "100kb"}));
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

//all the /public routes..
const staticMiddleware = express.static(path.join(__dirname, 'public'),{
  dotfiles: 'ignore',
  etag: false,
  //extensions: ['htm', 'html'],
  index: false,
  lastModified: true,
  maxAge: 0,//'1d',
  redirect: false
  // setHeaders: function (res, path, stat) {
  //   res.set('x-timestamp', Date.now())
  // }
});

//Static builds
const buildablePaths = {
  "/dist/js/main.js": "./node_modules/.bin/esbuild ./frontend/app.mjs  --outfile=./public/dist/js/main.js --bundle --define:global=window --minify"
}

app.use(function handleStaticAssets(req, res, next){
  let buildCmd = buildablePaths[req.path];
  if(buildCmd){
    console.log("running dynamicbuild", buildCmd);
    exec(buildCmd, function(error, stdout, stderr){
      if(error){
        console.error("Problem with build", error);
      }
      else if(stderr){
        console.error("Problem with build", stderr);
      }
      else{
        console.log(stdout);
      }
      staticMiddleware(req,res,next);
    });
  }
  else{
    staticMiddleware(req,res,next);
  }
});

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
}
main();
