import knex  from 'knex';
import user from './models/user.mjs';

export const pg = knex({
  client: 'pg',
  connection: "postgresql://postgres:password@127.0.0.1:5432/crypto-shell_dev" ||process.env.PG_CONNECTION_STRING
});

export const User = new user(pg);

//TODO: Include knex logging in whatever logger we choose
/*
const knex = require('knex')({
   log: {
    warn(message) {
    },
    error(message) {
    },
    deprecate(message) {
    },
    debug(message) {
    },
  }
})
*/

