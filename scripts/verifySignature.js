const bs58 = require('bs58');
const { sign } = require('tweetnacl');

const signature = "61EXZ1bjx65W4JTLYcsCvxkwNrD9vUs9Nyx2d8vf2gb2L79s1ebzpeWxQG1d1Fx19xBTkbwrYVKnGRmQ8JhcDVUk";
const msg = "IAMTHEBREADOFLIFE";
const public_address_str = "5uidNaagN5UZbUetFG9h4CLTFicyBWkXPYSbdBpXeAmt";

/* ALL VALUES MUST BE ENCODED TO Uint8Array */
const sig_uint8 = bs58.decode(signature);
const msg_uint8 = new TextEncoder().encode(msg);
const public_address_uint8 = bs58.decode(public_address_str);
const valid_signature = sign.detached.verify(msg_uint8, sig_uint8, public_address_uint8);


console.log(`*
*
*
* message => "${msg}"
* public_address_str => ${public_address_str}
* signature => ${signature}
*
* IS SIGNATURE VALID:${valid_signature}
*
*
*`);