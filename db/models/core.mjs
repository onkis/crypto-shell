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
    return asyncWrap(this.pg.select("*").where({id: id}).from(this.tableName).limit(1));
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
}