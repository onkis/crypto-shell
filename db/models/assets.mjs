import core from './core.mjs';

export default class assets extends core {
  
  constructor(knex){
    super(knex, "assets");
  }

  async createDefaultAsset(org_id){
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
  onFind(obj){ //TODO array?
    if(obj && obj.config){
      obj.config = JSON.parse(obj.config);
    }
    return obj;
  }
  
  onSave(obj){
    if(obj.config){
      obj.config = JSON.stringify(obj.config);
    }
    return obj;
  }

}
