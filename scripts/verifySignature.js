const bs58 = require('bs58');
const { sign } = require('tweetnacl');

const signature = [250,73,62,161,244,19,26,113,159,133,109,147,35,10,7,30,3,213,48,108,23,37,217,71,154,240,245,152,72,227,6,187,104,115,244,206,111,185,174,48,144,186,1,149,128,52,48,81,181,20,84,161,82,136,2,67,101,0,29,199,125,71,37,9];

const msg = "IAMTHEBREADOFLIFE";
const public_address_str = "5uidNaagN5UZbUetFG9h4CLTFicyBWkXPYSbdBpXeAmt";

/* ALL VALUES MUST BE ENCODED TO Uint8Array */
const sig_uint8 = bs58.decode(bs58.encode(signature));
const msg_uint8 = new TextEncoder().encode(msg);
const public_address_uint8 = bs58.decode(public_address_str);
const valid_signature = sign.detached.verify(msg_uint8, sig_uint8, public_address_uint8);


console.log(`*
*
*
* message => "${msg}"
* public_address_str => ${public_address_str}
* signature => ${bs58.encode(signature)}
*
* IS SIGNATURE VALID:${valid_signature}
*
*
*`);