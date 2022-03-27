import { PublicKey, Keypair, Connection, sendAndConfirmTransaction, Transaction } from '@solana/web3.js';
import { encodeURL, createQR, createTransaction, parseURL } from '@solana/pay';
import BigNumber from 'bignumber.js';

const state = {};
const sp = document.querySelector('#sol_pay');
const s = document.createElement('span');

const USE_QR = false;
const MAIN_NET = false;
const CLUSTER = (MAIN_NET) ? "https://api.mainnet-beta.solana.com" : "https://api.testnet.solana.com";

console.log(`🔗 CLUSTER:${CLUSTER}`);

s.innerText = "Donate ";
s.style['font-weight'] = '500';
s.style['font-size'] = '20px';
s.style.border = '1px solid';
s.style.padding = '5px';
s.style['border-radius'] = '5px';
s.style.cursor = 'pointer';
s.style.position = 'relative';
s.onclick = handlePaymentHD;

const i = document.createElement('img');
i.src = "http://localhost:3000/images/sp-black.svg";
i.style['margin-top'] = '-4px';
i.style.with = '60px';

const f = document.createElement('input');
f.min = "1.00";
f.max = "10000.00";
f.step = "0.5";
f.type = 'number';
f.placeholder = '$5.00';
f.style.fontSize = '20px';
f.style.width = '100px';

sp.appendChild(f);
sp.appendChild(s);
s.appendChild(i);

const connectWallet = async () => {
  const { solana } = window;
  if (solana.isPhantom) {
    console.log("phantom connected");
    const response = await solana.connect();
    state.publicKey = response.publicKey;
    state.provider = response;
    console.log(`Connected with Public Key:`, state.publicKey);
  }
}

const init = async () => {
  await connectWallet();
  state.connection = new Connection(CLUSTER, 'confirmed');
}

async function handlePaymentHD () {
  const value = document.querySelector('#sol_pay input').value;

  const props = {
    address: '~~address~~',
    label: '~~label~~',
    message: '~~message~~'
  };

  const recipient = new PublicKey(props.address);
  const reference = new Keypair().publicKey;
  const amount = new BigNumber(value);
  const memo = 'JC#4098';

  let tx;
  let recentBH;

  try{
    tx = await createTransaction(state.connection, state.publicKey, recipient, amount, { reference, memo });
    recentBH = await state.connection.getRecentBlockhash('finalized');
  }
  catch(e){
    console.error(e);
  }

  try{
    tx.recentBlockhash = recentBH.blockhash;
    tx.feePayer = state.publicKey;
    
    console.log("Transaction Object =>", tx);
    
    const signedTransaction = await window.solana.signAndSendTransaction(tx);
  }
  catch(err){
    console.log("failed to signAndSendTransaction", err);
  }
}

function handlePaymentQR(){
  const value = document.querySelector('#sol_pay input').value;
  const props = {
    address: '~~address~~',
    value: value,
    label: '~~label~~',
    message: '~~message~~',
    memo: 'JC#4098'
  };

  const qrCode = _getQrCode(props);
  const element = document.getElementById('qrCode');
  element.innerHTML = null;
  qrCode.append(element);
}

init();

/* Creates QR Code */
function _getQrCode({ address, value, label, message, memo }){
  const recipient = new PublicKey(address);
  const amount = new BigNumber(value),
        reference = new Keypair().publicKey,
        qrCodeSize = 250;

  const url = encodeURL({ recipient, amount, reference, label, message, memo });
  const qrCode = createQR(url, qrCodeSize);
  return qrCode;
}



