const Hashids = require('hashids')
const hashids = new Hashids()

const id = 5;

const hash = hashids.encode(id);

console.log(`
/*** scripts/hashId.js ***/
*
*
*
hashids.encode(${id}) => ${hash}
*
*
*
/***/
`);