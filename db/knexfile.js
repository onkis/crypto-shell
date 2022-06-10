const path = require('path');
const result = require('dotenv').config({path: path.resolve(process.cwd()+"/../.env")});
module.exports = {
  client: 'better-sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: process.env.SQLITE_FILE
  }
  
};
//postgresql://[user[:password]@][netloc][:port][/dbname][?param1=value1&...]
