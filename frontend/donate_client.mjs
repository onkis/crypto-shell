import { clusterApiUrl, Connection, PublicKey, Keypair } from '@solana/web3.js';
import { encodeURL, createQR, findTransactionSignature } from '@solana/pay';
import BigNumber from 'bignumber.js';

async function main() {
  const connection = new Connection(clusterApiUrl('testnet'), 'confirmed');
  const recipient = new PublicKey('wBgDX9D5sn9opVV4EQYDEvsLYT4intU5TttZRi7LqK8');

  const amount = new BigNumber(0.001),
        reference = new Keypair().publicKey,
        label = 'MackCash',
        message = 'Order: #001234',
        memo = 'JC#4098',
        qrCodeSize = 250;
 
  const url = encodeURL({ recipient, amount, reference, label, message, memo });
  const qrCode = createQR(url, qrCodeSize);

  /* Adding QR Code To DOM */
  const element = document.getElementById('qrCode');
  qrCode.append(element);

  /* Check Status... Need To Move This To Server */
  setInterval(async () => {
    let signatureInfo = await findTransactionSignature(connection, reference, undefined, 'confirmed');
    console.log("signatureInfo =>", signatureInfo);
  }, 1500);
}

main();