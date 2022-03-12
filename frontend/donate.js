import { PublicKey, Keypair } from '@solana/web3.js';
import { encodeURL, createQR } from '@solana/pay';
import BigNumber from 'bignumber.js';

const sp = document.querySelector('#sol_pay');
const s = document.createElement('span');

s.innerText = "Donate ";
s.style['font-weight'] = '500';
s.style['font-size'] = '20px';
s.style.border = '1px solid';
s.style.padding = '5px';
s.style['border-radius'] = '5px';
s.style.cursor = 'pointer';
s.style.position = 'relative';
s.onclick = () => {
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