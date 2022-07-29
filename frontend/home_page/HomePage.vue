<template lang="pug">
.container.col-xxl-10.px-4
  .row.flex-lg-row-reverse.align-items-center.g-5.pt-5
    .col-10.col-sm-8.col-lg-5
      img.d-block.mx-lg-auto.img-fluid.no-cursor-events(src="/images/roti-logo.gif", alt="Roti Logo", width="700", height="500", loading="lazy")
    .col-lg-7
      h1.display-5.fw-bold.mb-3 CRYPTO TIPS AND DONATIONS MADE EASY
      p.lead Powered by Solana Pay
      //.d-grid.gap-2.d-md-flex.justify-content-md-start
      div.d-grid.vstack.gap-3.col-md-12.mx-auto
        div(v-if="isPhantomInstalled")
          a.btn.btn-primary.btn-lg.px-4.me-md-2.login-with-button(type="button", @click="loginWithPhantom()") Login With Phantom
        div(v-if="isBraveInstalled")
          a.btn.btn-primary.btn-lg.px-4.me-md-2(type="button", @click="loginWithBrave()") Login With Brave
        div
          a.btn.btn-outline-secondary.btn-lg.px-4(type="button", href="/login") Login With Email
section.wave-bg
section(style="background-color: #64b568; color: #fff;")
  .container.col-xxl-10.px-4
    .row.justify-content-md-center.py-5
      .col-12
        h1.text-center HOW ROTI PAY WORKS
    .row.justify-content-md-center
      .col-7.py-4
        .background-block.p-3
          span 1. Login
    .row.justify-content-md-center
      .col-7.py-4
        .background-block.p-3
          span 2. Add your wallet address and customize your donation or tip page.
    .row.justify-content-md-center
      .col-7.py-4
        .background-block.p-3
          span 3. Publish your payment page and you're good to go!
    .row.justify-content-md-center.py-5
      .col-12
        hr
    .row.justify-content-md-center.py-5
      .col-12
        h1.text-center ROTI BENEFITS
    .row.justify-content-md-center
      .col-8.py-4
        p Roti is powered by the Solana Pay network and offers a simple way for you to incorporate tips or donations on your website or application.
    .row.justify-content-md-center
      .col-8.py-4
        p With Roti, you get the following benefits: 
</template>

<script>
import {isPhantomInstalled, connectToPhantom, connectToBrave, isBraveInstalled} from '../lib/wallet.js';

export default {
  components: {  },
  data() {
    return {
      phantomWallet: null,
      braveWallet: null,
      isPhantomInstalled: isPhantomInstalled(),
      isBraveInstalled: isBraveInstalled()
    };
  },
  computed: {},
  mounted() {
  },
  methods: {
    async loginWithPhantom(){
      this.phantomWallet = await connectToPhantom();
      if(!this.phantomWallet) return;
      else this._loginWithWallet(this.phantomWallet);
    },
    async loginWithBrave(){
      this.braveWallet = await connectToBrave();
      if(!this.braveWallet) return;
      else this._loginWithWallet(this.braveWallet);
    },
    async _loginWithWallet(wallet){
      let public_address = wallet.publicKey.toBase58();
      console.log("wallet public key", wallet.publicKey.toBase58());
      
      const messageResp = await this.$http.post('/auth/wallet-message', { public_address });
      const { status } = messageResp;
      
      if(status !== 200) console.error("Failed to request message to sign | HomePage.vue#_loginWithWallet");
      else{
        const msg = messageResp?.data?.msg;
        let [err, signed_message] = await wallet.sign(msg);
        
        console.log("signed message", err, signed_message);
        const validateResponse = await this.$http.post('/auth/wallet-validate-signature', { public_address, signed_message });
        
        let { status } = validateResponse;
        
        if(status !== 200) return console.error("Failed to validate signature | HomePage.vue#_loginWithWallet");
        else window.location = '/app';
        
      }
    }
  }
};
</script>

<style scoped>
  .wave-bg {
    height: 250px;
    background: url(http://localhost:3000/images/wave-bg.svg);
    background-size: cover;
    background-position-y: top;
  }

  .full-height {
    min-height: 100vh;
  }

  .big-height {
    min-height: 80vh;
  }

  .background-block {
    background-color: rgba(33, 37, 41, .5);
  }

  h1 {
    line-height: 3.5rem;
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