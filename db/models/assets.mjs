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
  
  async update({where, update}){
    //TODO: I think we can remove this. I added b/c I thought there was a bug in how json columns were handled in sqlite3
    //but I think it might be a front end bug
    if(update.config){
      update.config = JSON.stringify(update.config);
    }
    
    return super.update({where, update});
  }
  
}
