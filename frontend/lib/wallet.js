import bs58 from 'bs58'; //TOOD: is this dependency required?

/**
 * returns true if phantom is installed
 * @returns {boolean}  - true if phantom wallet is installe4d
 */
export function isPhantomInstalled(){
  const isPhantomInstalled = window.phantom?.solana?.isPhantom
  return isPhantomInstalled ? true : false;
}

/**
 * returns true if brave wallet is installed
 * @returns {boolean}  - true if brace wallet is installed
 */
export function isBraveInstalled(){
  const isBraveInstalled = window?.braveSolana?.isBraveWallet;
  return isBraveInstalled ? true : false;
}

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
 * if phantom is installed it will init 
 * a connection with the wallet
 * 
 * @returns {Phantom}  - An instance of the Phantom Class
 */
export async function connectToPhantom(){
  if( isPhantomInstalled() ){
    let phantom = new Phantom();
    
    await phantom.connect();//TODO: what permissions to pass...
    
    return phantom;
  }
  else return null;
}

/**
 * This class provides helper methods for accessing
 * a phantom browser extension wallet
 */
class Phantom{
  constructor(){
    //TODO: this seems like it could be made more robust
    const provider = window.phantom?.solana;
    if(provider?.isPhantom){
      this.provider = provider;
    }
    this.wallet = null;
    this.publicKey = null;
  }
  /**
   * Called to init the connection to the wallet
   */
  async connect(){
    let [err, wallet] = await asyncWrap(this.provider.connect());
    
    console.log("got wallet", err, wallet);
    
    this.wallet = wallet;
    this.publicKey = wallet.publicKey;
    
    if(err){
      console.error("user rejected access to wallet", err);
    }
  }
  
  async signAndSendTransaction(transaction){
    let [err, sig] = await asyncWrap(this.provider.signAndSendTransaction(transaction));
    console.log("phantom signAndSend", err, sig);
    return [err, sig];
  }
  
  /**
   * Prompts user to sign a message with their private key
   * @param {String} message - The message to sign (should be from server)
   * @returns {[err, signed_message]}  - returns a tuple error object and base58 encoded string
   */
  async sign(message){
    //TODO: Why can't the server encode the message?
    const encodedMessage = new TextEncoder().encode(message);
    
    const [err, signedMessage] = await asyncWrap(this.provider.signMessage(encodedMessage, "utf8"));
    let bs58String = bs58.encode(signedMessage.signature);
    return [err, bs58String];
  }
}


/**
 * if brave wallet is installed it will init 
 * a connection with the wallet
 * 
 * @returns {Brave}  - An instance of the Brave Class
 */
export async function connectToBrave(){
  if( isBraveInstalled() ){
    let brave = new Brave();
    
    await brave.connect();
    
    return brave;
  }
  else return null;
}


class Brave{
  constructor(){
    this.braveSolana = window.braveSolana;
    this.wallet = null;
    this.publicKey = null;
  }
  async connect(){ //AKA may I see your public key
    let [err, wallet] = await asyncWrap(this.braveSolana.connect());
    console.log("got brave", err, wallet);
    
    this.wallet = wallet;
    this.publicKey = wallet.publicKey;
    
    if(err){
      console.error("user rejected access to brave wallet", err);
    }
  }
  /**
   * this function signs and sends a transaction to the network
   * TODO: should we follow up with a verification?
   *  
   * @param {Object} transaction - solna transaction object https://solana-labs.github.io/solana-web3.js/classes/Transaction.html
   * @param {Object} sendOptions - Send options https://wallet-docs.brave.com/solana/provider-api/methods#bravesolanasignandsendtransaction
   * @returns {Tuple}  - [err, result]
   */
  async signAndSendTransaction(transaction, sendOptions={maxRetries: 5, preflightCommitment: 'finalized', skipPreflight: false}){
    let [err, result] =  await asyncWrap(window.braveSolana.signAndSendTransaction(transaction, sendOptions));
    //TODO confirm transaction?
    return [err, result];
  }
  
  /**
   * Prompts user to sign a message with their private key
   * @param {String} message - The message to sign (should be from server)
   * @returns {[err, signed_message]}  - returns a tuple error object and base58 encoded string
   */
  async sign(message){
    //TODO: Why can't the server encode the message?
    const encodedMessage = new TextEncoder().encode(message);
    
    const [err, signedMessage] = await asyncWrap(window.braveSolana.signMessage(encodedMessage, "utf8"));
    let bs58String = bs58.encode(signedMessage.signature);
    console.log("signed message", signedMessage);
    return [err, bs58String];
  }
}