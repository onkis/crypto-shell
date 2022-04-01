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