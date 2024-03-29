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
  "/dist/donation_page/donation_page.js": "node frontend/es_build_donation_page.js",
  "/dist/home_page/home_page.js": "node frontend/es_build_home_page.js",
  "/dist/app/app.js": "node frontend/es_build_app.js",
  "/dist/tailwind.css": "node frontend/node_modules/tailwindcss/lib/cli.js -c ./frontend/tailwind/tailwind.config.js -i ./frontend/tailwind/core.css -o ./public/dist/tailwind.css"
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
  if(buildCmd && process.env.NODE_ENV !== 'production'){ //TODO: don't run this in "production builds"
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
  if(req.session.user) {
    next();
  }
  else{
    res.redirect('/login');
  }
}