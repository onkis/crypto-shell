import * as Vue from 'vue';
import axios from 'axios'
import VueAxios from 'vue-axios'


import DonationApp from './DonationPage.vue';

Vue.createApp(DonationApp)
.use(VueAxios, axios)
.use(SolanaWallets, walletOptions)
.mount('#DonationApp');