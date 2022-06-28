import * as Vue from 'vue';
import axios from 'axios'
import VueAxios from 'vue-axios'
import HomePage from './HomePage.vue';

import SolanaWallets from 'solana-wallets-vue';
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';

const walletOptions = {
  wallets: [
    new PhantomWalletAdapter({ network: WalletAdapterNetwork.Devnet })
  ],
  autoConnect: true
}

import 'solana-wallets-vue/styles.css';

Vue.createApp(HomePage)
.use(VueAxios, axios)
.use(SolanaWallets, walletOptions)
.mount('#HomePage');