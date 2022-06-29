import * as Vue from 'vue';
import axios from 'axios'
import VueAxios from 'vue-axios'
import HomePage from './HomePage.vue';

import SolanaWallets from 'solana-wallets-vue';

import { BraveWalletAdapter } from "@solana/wallet-adapter-brave"
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';

const walletOptions = {
  wallets: [
    new BraveWalletAdapter({ network: WalletAdapterNetwork.Testnet }),
    new PhantomWalletAdapter({ network: WalletAdapterNetwork.Testnet }),
    new SolflareWalletAdapter({ network: WalletAdapterNetwork.Testnet })
  ],
  autoConnect: true
}

import 'solana-wallets-vue/styles.css';

Vue.createApp(HomePage)
.use(VueAxios, axios)
.use(SolanaWallets, walletOptions)
.mount('#HomePage');