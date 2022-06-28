import * as Vue from 'vue';
import axios from 'axios'
import VueAxios from 'vue-axios'
import SolanaWallets from 'solana-wallets-vue';
import 'solana-wallets-vue/styles.css';
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"

import {
  PhantomWalletAdapter,
  // SlopeWalletAdapter,
  // SolflareWalletAdapter,
  // BraveWalletAdapter
} from '@solana/wallet-adapter-wallets';

const walletOptions = {
  wallets: [
    new PhantomWalletAdapter({ network: WalletAdapterNetwork.Devnet }),
    // new SlopeWalletAdapter(),
    // new SolflareWalletAdapter({ network: WalletAdapterNetwork.Devnet }),
    // new BraveWalletAdapter()
  ],
  autoConnect: true
};



import DonationApp from './DonationPage.vue';

Vue.createApp(DonationApp)
.use(VueAxios, axios)
.use(SolanaWallets, walletOptions)
.mount('#DonationApp');