import express from 'express';
import { exec } from 'child_process';
import path from 'path';
//to replace __dirname
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';
// const __dirname = dirname(fileURLToPath(import.meta.url));
const __dirname = path.dirname(process.argv[1]);



//Static builds
//any request for a "buildablePath" results in the command being run
export const buildablePaths = {
  "/dist/js/donate_client.js": "./node_modules/.bin/esbuild ./frontend/donate.js --outfile=./public/dist/js/donate_script.js --bundle --define:global=window --minify --inject:frontend/esbuild.inject.js",
  "/dist/app/app.js": "node frontend/es_build_app.js",
  "/dist/main.js": "node frontend/es_build_uikit.js",
  "/dist/material-dashboard.js": "node frontend/es_build_uikit_static.js",
  "/dist/js/donate_script.js": "./node_modules/.bin/esbuild ./frontend/donate.js  --outfile=./public/dist/js/donate_script.js --bundle --define:global=window --minify --inject:frontend/esbuild.inject.js"
}



/**
 * an wrapper around express' static
 * will cause registered routes to trigger a
 * build command before serving up static assets
 *
 * @param {Object} req - express req object
 * @param {Object} res - express res object
 * @param {Function} next - called when middleware is done
 */
export function handleStaticAssets(req,res,next){
  let buildCmd = buildablePaths[req.path];
  //console.log("handle static", buildCmd, req.path)
  if(buildCmd){ //TODO: don't run this in "production builds"
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
      _staticMiddleware(req,res,next);
    });
  }
  else{
    _staticMiddleware(req,res,next);
  }
}
//Setup the middleware but don't "use" it yet....
const _staticMiddleware = express.static(path.join(__dirname, 'public'),{
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


/**
 * a middleware that requires a user session object
 * to exist to proceed. Otherwise we will redirect
 * to the login screen
 *
 * @param {Object} req - express req object
 * @param {Object} res - express res object
 * @param {Function} next - called when middleware is done
 */
export function wwwAuth(req, res, next){
  if(req.session.user) next();
  else{
    res.redirect('/login');
  }
}