import core from './core.mjs';
import Hashids from 'hashids'
const hashids = new Hashids()

export default class user extends core {
  
  constructor(knex){
    super(knex, "users");
  }
  
  onFind(obj){
    if(Array.isArray(obj)){
      obj.forEach(_onFindHelper); 
    }
    else{
      obj = _onFindHelper(obj);
    }
    return obj;
  }
  
}

function _onFindHelper(obj){
  if(obj && obj.id) obj.hashId = hashids.encode(obj.id);
  return obj
}