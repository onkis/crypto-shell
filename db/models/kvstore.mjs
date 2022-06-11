import core from './core.mjs';
import { asyncWrap } from '../../lib/core.mjs';

export default class kvstore extends core {
  
  constructor(knex){
    super(knex, "kvstore");
  }
  
  async set(key, value, options={}){    
    const newRecord = {
      key: key,
      value: value
    };
    
    if(options.EX){
      newRecord.expire_at = Date.now() + (options.EX*1000);
    }
    
    return asyncWrap(this.pg(this.tableName).insert(newRecord));
  }
  
  async get(key){
    let [err, ret] = await asyncWrap(
                        this.pg.select('*')
                        .from(this.tableName)
                        .where('key', key)
                        .andWhere('expire_at', '>', Date.now()));

    if(ret?.length > 0) ret = ret[0];
    else ret = null;
    
    ret = ret.value;
    
    return [err, ret];
  }
}
