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
      newRecord.expire_at = Math.ceil(Date.now()/1000) + (options.EX);
    }
    
    return asyncWrap(this.pg(this.tableName).insert(newRecord));
  }
  
  async get(key){
    let [err, ret] = await asyncWrap(
                        this.pg.select('*')
                        .from(this.tableName)
                        .where('key', key)
                        .andWhere('expire_at', '>', Math.ceil(Date.now()/1000) )); //TOOD: handle if expire_at is NULL!!!

    if(ret?.length > 0){
      ret = ret[0];
      ret = ret.value;
    }
    else ret = null;
    
    
    
    return [err, ret];
  }
  
  /**
   * This is provided for sqlite-session
   * it shouldn't be used by anyone
   * @param {String} key - the key
   * @param {function} callback - the node.js callback
   */
  getCB(key, callback){
    this.pg.select('*')
    .from(this.tableName)
    .where('key', key)
    .andWhere('expire_at', '>', Math.ceil(Date.now()/1000))
    .then(function(ret){
      
      if(ret?.length > 0) {
        ret = ret[0];
        ret = ret.value;
      }
      else ret = null;
      
      callback(null, ret);
    })
    .catch(function(err){
      callback(err);
    });
  }
  /**
   * this is provide for sqlite-session
   * it shouldn't be used by anyone
   * @param {String} key - the key
   * @param {String} value - the value
   * @param {Object} options - the "options" only respects EX
   * @param {Function} callback - called when complete
   */
  setCB(key, value, options={}, callback){
    const newRecord = {
      key: key,
      value: value
    };
    console.log("calling setCB", key, value, options);
    if(options.EX){
      console.log("in the options.ex", (options.EX))
      newRecord.expire_at = Math.ceil(Date.now()/1000) + (options.EX);
    }
    console.log("new record", newRecord);
    this.pg(this.tableName).insert(newRecord)
    .then(function(ret){ callback(null, ret); })
    .catch(function(err){ callback(err);});
  }
  /**
   * this is provided for sqlite-session
    * it shouldn't be used by anyone
   * @param {String} key - the key
   * @param {Function} callback - called when complete
   */
  delCB(key, callback){
    this.pg(this.tableName).where('key', key).del()
    .then(function(res){
      callback(null, res);
    })
    .catch(function(err){
      callback(err);
    });
  }
  /**
   * this is provided for sqlite-session
   * anyone who thinks promises are good
   * is a fool. Look at this code. Does it 
   * look better
   * @param {String} key - the key
   * @param {Number} ttl - the TTL to update in seconds
   * @param {Function} callback - called when complete
   */
  expireCB(key, ttl, callback){
    //first delete if it is expired
    let that = this;
    //Freaking promises are stuipid
    this.pg(this.tableName)
      .where('key', key)
      .andWhere('expire_at' < Math.ceil(Date.now()/1000))
      .del()
      .then(function(ret){
        if(ret === 1) callback(null, 0);
        else{
          //second update the expiredAt
          that.pg(that.tableName)
            .where('key', key)
            .update('expire_at', Math.ceil(Date.now()/1000)+ttl)
            .then(function(){
              callback(null, 1);
            })
            .catch(function(err){
              callback(err);
            });
        }
      })
      .catch(function(err){
        callback(err);
      });
  }
}

