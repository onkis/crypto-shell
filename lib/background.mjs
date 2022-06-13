import {KVStore} from "../db/db.mjs";

/**
 * This function is desinged to handle "background"
 * jobs that happen on an interval. It is desinged
 * to be spawned once per application life cycle
 */
export function main(){
  expireKVStoreItems();  
}


function expireKVStoreItems(){
  setInterval(async function(){
    await KVStore.expireKeys();
  }, 30*1000);
}