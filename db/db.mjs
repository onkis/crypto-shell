import knex  from 'knex';
import user from './models/user.mjs';
import assets from './models/assets.mjs';
import donations from "./models/donations.mjs";

export const pg = knex({
  client: 'pg',
  connection: process.env.PG_CONN
});

export const User = new user(pg);
export const Assets = new assets(pg);
export const Donation = new donations(pg);

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

