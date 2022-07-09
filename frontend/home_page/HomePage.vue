<template lang="pug">
.container.col-xxl-8.px-4.py-5
  .row.flex-lg-row-reverse.align-items-center.g-5.py-5
    .col-10.col-sm-8.col-lg-6
      img.d-block.mx-lg-auto.img-fluid.no-cursor-events(src="/images/roti-logo.gif", alt="Roti Logo", width="700", height="500", loading="lazy")
    .col-lg-6
      h1.display-5.fw-bold.lh-1.mb-3 Accept USDC & SOL
      p.lead Easily Accept USDC and SOL for domains or tips
      .d-grid.gap-2.d-md-flex.justify-content-md-start
        a.btn.btn-primary.btn-lg.px-4.me-md-2.login-with-button(type="button", @click="loginWithPhantom()") Login With Phantom
        a.btn.btn-outline-secondary.btn-lg.px-4(type="button", href="/login") Login With Email
    .col-12
      #WALLET_ADAPTER
        //wallet-multi-button
</template>

<script>

import { Connection, clusterApiUrl } from '@solana/web3.js';
//import { useWallet } from 'solana-wallets-vue';
// import { WalletMultiButton } from 'solana-wallets-vue'
//import bs58 from 'bs58';

import {isPhantomInstalled, connectToPhantom} from '../lib/wallet.js';

export default {
  components: {  },
  data() {
    return {
      phantomWallet: null
    };
  },
  computed: {},
  mounted() {
    this._init();
  },
  methods: {
    async loginWithPhantom(){
      this.phantomWallet = await connectToPhantom();
      
      let public_address = this.phantomWallet.publicKey.toBase58();
      console.log("phantom public key", this.phantomWallet.publicKey.toBase58());

      const messageResp = await this.$http.post('/auth/wallet-message', { public_address });
      const { status } = messageResp;
      
      if(status !== 200) console.error("Failed to request message to sign | HomePage.vue#_requestMessageToSign");
      else{
        const msg = messageResp?.data?.msg;
        let [err, signed_message] = await this.phantomWallet.sign(msg);
        
        console.log("signed message", err, signed_message);
        const validateResponse = await this.$http.post('/auth/wallet-validate-signature', { public_address, signed_message });
        
        let { status } = validateResponse;
        
        if(status !== 200) return console.error("Failed to validate signature | HomePage.vue#_validateSignature");
        else window.location = '/app';
        
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