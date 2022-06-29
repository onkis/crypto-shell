<template lang="pug">
.container.col-xxl-8.px-4.py-5
  .row.flex-lg-row-reverse.align-items-center.g-5.py-5
    .col-10.col-sm-8.col-lg-6
      img.d-block.mx-lg-auto.img-fluid.no-cursor-events(src="/images/roti-logo.gif", alt="Roti Logo", width="700", height="500", loading="lazy")
    .col-lg-6
      h1.display-5.fw-bold.lh-1.mb-3 Accept USDC & SOL
      p.lead Easily Accept USDC and SOL for domains or tips
      .d-grid.gap-2.d-md-flex.justify-content-md-start
        a.btn.btn-primary.btn-lg.px-4.me-md-2.login-with-button(type="button", @click="handleClickLoginWithWallet()") Login With Wallet
        a.btn.btn-outline-secondary.btn-lg.px-4(type="button", href="/login") Login With Email
    .col-12
      #WALLET_ADAPTER
        wallet-multi-button
</template>

<script>

import { Connection, clusterApiUrl, Keypair, SystemProgram, Transaction } from '@solana/web3.js';
import { useWallet } from 'solana-wallets-vue';
import { WalletMultiButton } from 'solana-wallets-vue'

export default {
  components: { WalletMultiButton },
  data() {
    return {};
  },
  computed: {},
  mounted() {
    this.init();
  },
  methods: {
    async init(){
      const that = this;
      const connection = new Connection(clusterApiUrl('testnet'))
      that.connection = connection;
    },
    handleClickLoginWithWallet(){
      const that = this;
      const { publicKey, sendTransaction, connected, select } = useWallet();

      if(!connected.value){
        that._walletAdapterOpenModal();
        console.log("Need To Connect!");
      }
      else{
        console.log("Already Connected!");
      }
    },
    /* HELPER FUNCTIONS | A - Z */
    _walletAdapterCloseModal(){
      try{
        const closeButton = document.querySelector('.swv-modal-container .swv-modal-button-close');
        closeButton.click();
      }
      catch(e){
        console.error("HomePage.vue#_walletAdapterCloseModal", e);
      }
    },
    _walletAdapterOpenModal(){
      try{
        const openButton = document.querySelector('#WALLET_ADAPTER button');
        openButton.click();
      }
      catch(e) {
        console.error("HomePage.vue#_walletAdapterOpenModal", e);
      }
    }
  }
};
</script>

<style scoped>
  #WALLET_ADAPTER{
    display: none; /* 🥷 🥷 🥷 */
  }

  .login-with-button {
    background-color:#60b764;
    border-color:#60b764
  }

  .login-with-button:hover {
    background-color:#498c4c;
    background-color:#498c4c;
  }

  .no-cursor-events {
    pointer-events: none;
    user-select: none;
  }
</style>