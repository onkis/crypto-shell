module.exports = {
  client: 'pg',
  connection:  "postgresql://postgres:password@127.0.0.1:5432/crypto-shell_dev" //process.env.POSTGRES_DB_CONN ||
};

//postgresql://[user[:password]@][netloc][:port][/dbname][?param1=value1&...]
