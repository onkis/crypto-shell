require('dotenv').config()
module.exports = {
  client: 'better-sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: process.env.SQLITE_FILE
  }
  
};

//postgresql://[user[:password]@][netloc][:port][/dbname][?param1=value1&...]
