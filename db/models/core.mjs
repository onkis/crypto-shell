import assert from 'assert';
import { asyncWrap } from '../../lib/core.mjs';

export default class core {
  
  /**
   * Basic required fields for db interaction
   * @param {Object} knex - connection to pg
   * @param {String} tableName - The name of the table
   */
  constructor(knex, tableName){
    this.pg = knex;
    this.tableName = tableName;

    assert(this.pg, "models/core.mjs Must have a pg knex object");
    assert(this.tableName, "models/core.mjs Must have defined table name");
  }
  
  /**
   * Finds a record by Id
   * @param {Number} id - The id of the row in postgres
   * @returns {Array}  - [err, result] returns a tuple with an error and result
   */
  async findById(id){
    let [err, res] = await asyncWrap(this.pg.select("*").where({id}).from(this.tableName).limit(1));
    
    if(res?.length > 0) res = res[0];
    else res = null;
    
    return [err, res];
  }
  
  /**
   * find a Single record
   * @param {Object} where - The where clause
   * @returns {Array}  - [err, ret] tuple
   */
  async findOne(where){
    let [err, res] = await asyncWrap(this.pg.select("*").where(where).from(this.tableName).limit(1));
    
    if(res?.length > 0) res = res[0];
    else res = null;
    
    return [err, res];
  }
  
  async findOrCreate(where, record){
    let [err, res] = await this.findOne(where);
    
    if(err){
      return [err, null];
    }
    else if(res){//found one
      return [null, {...res, __found: true}];
    }
    else{//need to create
      let [createErr, createRec] = await this.create(record);
      if(createErr) return [createErr, null];

      let [err, res] = await this.findOne(where);

      if(err){
        console.log(err);
        return [err];
      }
      else{
        return [null, {...res, __created: true}];
      }
    }
  }
  
  async create(record){
    const NOW = new Date().toISOString();
    const newRecord = {
      ...record,
      created_at: NOW,
      updated_at: NOW
    };

    return asyncWrap(this.pg(this.tableName).insert(newRecord));
  }

  async update({where, update}){
    const updated_at = new Date().toISOString();
    const updatedRecord = {...update, updated_at};

    return asyncWrap(
      this.pg(this.tableName)
      .where(where)
      .update(updatedRecord)
     );
  }

  async destroy(where){
    return asyncWrap(this.pg(this.tableName).where({...where}).del());
  }
  
}