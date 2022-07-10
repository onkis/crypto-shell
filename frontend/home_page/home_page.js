import * as Vue from 'vue';
import axios from 'axios'
import VueAxios from 'vue-axios'
import HomePage from './HomePage.vue';

// import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
// import { BraveWalletAdapter } from "@solana/wallet-adapter-brave";
// import { CoinbaseWalletAdapter } from "@solana/wallet-adapter-coinbase";
// import { ExodusWalletAdapter } from "@solana/wallet-adapter-exodus";
// import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
// import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";
// 
// import SolanaWallets from 'solana-wallets-vue';
// 
// const walletOptions = {
//   wallets: [
//     new BraveWalletAdapter({ network: WalletAdapterNetwork.Testnet }),
//     new PhantomWalletAdapter({ network: WalletAdapterNetwork.Testnet }),
//     new SolflareWalletAdapter({ network: WalletAdapterNetwork.Testnet })
//   ],
//   autoConnect: true
// }
// 
// import 'solana-wallets-vue/styles.css';

Vue.createApp(HomePage)
.use(VueAxios, axios)
// .use(SolanaWallets, walletOptions)
.mount('#HomePage');