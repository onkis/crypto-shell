import core from './core.mjs';
import Hashids from 'hashids'
const hashids = new Hashids()

export default class paymentpage extends core {
  
  constructor(knex){
    super(knex, "paymentpages");
  }

  async createDefaultPage(org_id){
    const DEFAULT = {
      org_id,
      config: {
        "address":"",
        "label":"Enter Label", 
        "redirectUrl": ""
       }
    };

    return await this.create({...DEFAULT});
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
    if(obj && obj.config){
      obj.config = JSON.stringify(obj.config);
    }
    return obj;
  }

}
function _onFindHelper(obj){
  if(obj && obj.config){
    obj.config = JSON.parse(obj.config);
  }
  if(obj && obj.id) obj.hashId = hashids.encode(obj.id);
  
  return obj
}
