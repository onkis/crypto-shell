import bs58 from 'bs58'; //TOOD: is this dependency required?

/**
 * returns true if phantom is installed
 * @returns {boolean}  - true if phantom wallet is installe4d
 */
export function isPhantomInstalled(){
  const isPhantomInstalled = window.phantom?.solana?.isPhantom
  return isPhantomInstalled;
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

export async function connectToPhantom(){
  if(isPhantomInstalled()){
    let phantom = new Phantom();
    
    await phantom.connect();//TODO: what permissions to pass...
    
    return phantom;
  }
  else return null;
}


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
  
  async connect(){
    let [err, wallet] = await asyncWrap(this.provider.connect());
    
    console.log("got wallet", err, wallet);
    
    this.wallet = wallet;
    this.publicKey = wallet.publicKey;
    
    if(err){
      console.error("user rejected access to wallet", err);
    }
  }
  
  async sign(message){
    //TODO: Why can't the server encode the message?
    const encodedMessage = new TextEncoder().encode(message);
    
    const [err, signedMessage] = await asyncWrap(this.provider.signMessage(encodedMessage, "utf8"));
    let bs58String = bs58.encode(signedMessage.signature);
    return [err, bs58String];
  }
}