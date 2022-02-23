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