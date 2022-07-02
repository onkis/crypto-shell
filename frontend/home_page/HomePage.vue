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

import { Connection, clusterApiUrl } from '@solana/web3.js';
import { useWallet } from 'solana-wallets-vue';
import { WalletMultiButton } from 'solana-wallets-vue'

export default {
  components: { WalletMultiButton },
  data() {
    return {};
  },
  computed: {},
  mounted() {
    this._init();
  },
  methods: {
    handleClickLoginWithWallet(){
      const that = this;
      const { connected } = useWallet();

      if(!connected.value){
        that._walletAdapterOpenModal();
        console.log("Need To Connect!");
      }
      else{
        that._requestMessageToSign();
      }
    },
    /**
     * 
     * HELPER FUNCTIONS | A - Z
     *
     */
    async _init(){
      const that = this;
      const connection = new Connection(clusterApiUrl('testnet'))
      that.connection = connection;
    },
    async _requestMessageToSign(){
      const { publicKey } = useWallet();
      const public_address = publicKey._value.toBase58();
      
      const response = await this.$http.post('/auth/wallet-message', { public_address });
      const { status, data } = response;
      if(status !== 200) console.error("Failed to request message to sign | HomePage.vue#_requestMessageToSign");

      const { msg } = data;
      const sig = await this._sign(msg);

      const signatureArr = sig.signature.toJSON().data;

      await this._validateSignature(signatureArr);

    },
    async _sign(msg){
      const that = this;
      try{
        const { publicKey, wallet } = useWallet();
        const { signMessage } = wallet?._value?._wallet;

        if (!publicKey) throw new Error('Wallet not connected!');
        if (!signMessage) throw new Error('Wallet does not support message signing!');

        const messageToSign = new TextEncoder().encode(msg);
        const signature = await signMessage(messageToSign);

        return signature;
      }
      catch(e){
        console.error("HomePage.vue#_sign", e);
      }
    },
    async _validateSignature(sig){
      const { publicKey } = useWallet();
      const public_address = publicKey._value.toBase58();

      if(!sig.length) return console.error("No signature | HomePage.vue#_validateSignature");
      else{
        const response = await this.$http.post('/auth/wallet-validate-signature', { public_address, sig });
        const { status, data } = response;
        if(status !== 200) return console.error("Failed to validate signature | HomePage.vue#_validateSignature");
      }
    },
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