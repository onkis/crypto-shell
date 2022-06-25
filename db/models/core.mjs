import assert from 'assert';
import { asyncWrap } from '../../lib/core.mjs';
import Hashids from 'hashids'
const hashids = new Hashids()

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
   * gives opportunity to massage data
   * coming out of the db called by all find methods
   * @param {Object || Array} obj - row or rows of data
   */
  onFind(obj){
    return obj;
  }
  /**
   * gives opportunity to massage object
   * before it is sent to knex
   * it is called by all update and insert queries
   *
   * @param {Object} obj - The raw object to be saved
   */
  onSave(obj){
    return obj;
  }
  /**
   * Finds a record by HashId
   * @param {String} hashId - The hashid of the row in db
   * @returns {Array}  - [err, result] returns a tuple with an error and result
   */
  async findByHashId(hashId){
    let id = hashids.decode(hashId);
    
    if(!id) return [new Error("No Id passed")];
    else if(id && id.length > 0) id = id[0];

    return this.findById(id);
  }
  
  /**
   * Finds a record by Id
   * @param {Number} id - The id of the row in postgres
   * @returns {Array}  - [err, result] returns a tuple with an error and result
   */
  async findById(id){
    if(!id) return [new Error("No Id passed")];
    
    let [err, res] = await asyncWrap(this.pg.select("*").where({id}).from(this.tableName).limit(1));
    
    if(res?.length > 0) res = res[0];
    else res = null;
    
    return [err, this.onFind(res)];
  }
  
  /**
   * find all records
   * @param {Object} where - knex where clause
   * @param {Number} limit - limit value, optional
   * @param {Number} offset - offset value, optional
   * @returns {Array}  - [err, Data<Array>]
   */
  async findAll(where, limit=null, offset=null){
    
    let query = this.pg.select("*").where(where).from(this.tableName);
    if(limit) query.limit(limit);
    if(offset) query.offset(offset);
    
    let [err, res] = await asyncWrap(query)
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
    
    return [err, this.onFind(res)];
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

    return asyncWrap(this.pg(this.tableName).insert(this.onSave(newRecord)));
  }

  async update({where, update}){
    const updated_at = new Date().toISOString();
    const updatedRecord = {...update, updated_at};

    return asyncWrap(
      this.pg(this.tableName)
      .where(where)
      .update(this.onSave(updatedRecord))
     );
  }

  async destroy(where){
    return asyncWrap(this.pg(this.tableName).where({...where}).del());
  }
  
}