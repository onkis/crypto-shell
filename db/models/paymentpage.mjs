import core from './core.mjs';
import Hashids from 'hashids'
const hashids = new Hashids()

export default class paymentpage extends core {
  
  constructor(knex){
    super(knex, "paymentpages");
  }

  async createDefaultPage(org_id, address = ""){
    const DEFAULT = {
      org_id,
      config: {
        "address": address,
        "label":"Enter Label",
        "logo": "https://s3.amazonaws.com/crypto-shell-prod/images/rE/rE/e28cb4e4055c4ec947e0b3307",
        "network": "mainnet-beta",
        "redirectUrl": "",
        "title": "Enter Title",
        "detail": "Enter Details",
        "completeTitle": "Thank You",
        "completeDetails": "Every Donation Helps!"
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
