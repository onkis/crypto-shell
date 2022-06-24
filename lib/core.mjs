import util from 'util';
import {exec as execCB} from 'child_process';
import vasync from 'vasync';


/**
 * crypto-shell - core.js
 * A place to put core re-useable stuff
 */


/**
 * Async Wrap provides a great way to use async/await
 * rather than a try/catch block it turns a promise
 * into a tuple [err, result] if there was no error
 * the first was an error
 * 
 * Heavily inspired by https://github.com/scopsy/await-to-js/blob/master/src/await-to-js.ts
 *
 * @param {Object} promise - a javascript promise
 */
export function asyncWrap(promise){
  return promise
  .then(function asyncWrapThen(data){
    return [null, data];
  })
  .catch(function asyncWrapError(err){
    return [err, null];
  });
}
/**
 * Sometimes you need to work with callback or stream
 * based API. vasync is helpful for this
 *
 * @param {Object} options - The vasync.pipline options object {arg:{}, funcs:[]}
 * @returns {Array}  - [err, results] the usual tuple
 */
export function vasyncPipeline(options){
  return asyncWrap(new Promise(function(resolve, reject){
    vasync.pipeline(options, function vasyncPipelineDone(errs, result){
      if(errs) {
        reject([errs, null]);
      }
      else resolve([null, result]);
    });
  }));
}
  


/**
 * what if all of the node api's didn't suck
 * and were more like this?
 * exec a command line command
 *
 * @param {String} cmd - The command line command
 * @returns {Array}  - [err, {stdout, stderr}] the usual tuple
 */
export async function exec(cmd){
  let execPF = util.promisify(execCB);
  return asyncWrap(execPF(cmd));
}

/**
 * adapted from https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
 * 
 * Generates a random string of the length passed
 * @param {Number} length - The length of the random string
 */
export function randomString(length) {
    let ret = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      ret += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return ret;
}

/**
 * checks if an email address is valid
 * allows unicode characters adapted from
 * https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
 * @param {String} email - The email address to be checked
 * @returns {boolean}  - is the email valid
 */
export function isEmailValid(email){
  const re =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return String(email).toLowerCase().match(re)
}
