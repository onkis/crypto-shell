import core from './core.mjs';

export default class donations extends core {
  
  constructor(knex){
    super(knex, "donations");
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
  
  onSave(obj){
    if(obj.donation_config){
      obj.donation_config = JSON.stringify(obj.donation_config);
    }
    return obj;
  }
}

function _onFindHelper(obj){
  if(obj && obj.donation_config){
    obj.donation_config = JSON.parse(obj.donation_config);
  }
  return obj
}
