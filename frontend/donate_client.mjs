import { PublicKey, Keypair } from '@solana/web3.js';
import { encodeURL, createQR } from '@solana/pay';
import BigNumber from 'bignumber.js';

export function main(_amount) {
  const recipient = new PublicKey('wBgDX9D5sn9opVV4EQYDEvsLYT4intU5TttZRi7LqK8');

  const amount = new BigNumber(_amount),
        reference = new Keypair().publicKey,
        label = 'MackCash',
        message = 'Order: #001234',
        memo = 'JC#4098',
        qrCodeSize = 250;
 
  const url = encodeURL({ recipient, amount, reference, label, message, memo });
  const qrCode = createQR(url, qrCodeSize);
  return qrCode;
}