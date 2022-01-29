const User = require('./models/user.js')
const Transaction = require('./models/transaction.js')
const Buyer = require('./models/buyer')

/**
 * Returns Object with all model Objects
 * in db.
 * @param {Function} query - a function that runs 
 * conforms to the query 
 */
module.exports = function(query){
  return {
    User: new User(query),
    TransAction: new Transaction(query)
  }
}