import knex  from 'knex';
import user from './models/user.mjs';
import paymentpage from './models/paymentpage.mjs';
import donations from "./models/donations.mjs";
import kvstore from "./models/kvstore.mjs";

// export const db = knex({
//   client: 'pg',
//   connection: process.env.PG_CONN
// });
export const db = knex({
  client: 'better-sqlite3',
  useNullAsDefault: true,
   // debug: true,
  connection: {
    filename: process.env.SQLITE_FILE
  }
});

export const User = new user(db);
export const PaymentPage = new paymentpage(db);
export const Donation = new donations(db);
export const KVStore = new kvstore(db);
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

