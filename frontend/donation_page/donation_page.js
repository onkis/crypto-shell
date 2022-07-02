import * as Vue from 'vue';
import axios from 'axios'
import VueAxios from 'vue-axios'

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import { BraveWalletAdapter } from "@solana/wallet-adapter-brave";
import { CoinbaseWalletAdapter } from "@solana/wallet-adapter-coinbase";
import { ExodusWalletAdapter } from "@solana/wallet-adapter-exodus";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";

import SolanaWallets from 'solana-wallets-vue';
import 'solana-wallets-vue/styles.css';


const walletOptions = {
  wallets: [
    new PhantomWalletAdapter({ network: WalletAdapterNetwork.Devnet }),
    new BraveWalletAdapter({ network: WalletAdapterNetwork.Devnet }),
    new CoinbaseWalletAdapter({ network: WalletAdapterNetwork.Devnet }),
    new SolflareWalletAdapter({ network: WalletAdapterNetwork.Devnet })
  ]
};



import DonationApp from './DonationPage.vue';

Vue.createApp(DonationApp)
.use(VueAxios, axios)
.use(SolanaWallets, walletOptions)
.mount('#DonationApp');