import knex  from 'knex';
import user from './models/user.mjs';
import assets from './models/assets.mjs';
import donations from "./models/donations.mjs";

export const db = knex({
  client: 'better-sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: process.env.SQLITE_FILE
  }
});

export const User = new user(db);
export const Assets = new assets(db);
export const Donation = new donations(db);

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

