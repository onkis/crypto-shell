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
  .container.col-xxl-10.px-4.pb-5
    .row.justify-content-md-center.pt-5
      .col-12
        h1.fw-bold.text-center HOW ROTI PAY WORKS
    .row.justify-content-md-center
      .col-sm-12.col-lg-7.py-4
        .background-block.py-5.px-4.zoom-in
          .row
            .col-2(style="line-height: 90px;")
              img.icon-img(src='/images/icon-1.png')
            .col-10
              span(style="font-size: 32px;") Login with either your email or Solana-based wallet (eg. Phantom).
    .row.justify-content-md-center
      .col-sm-12.col-lg-7.py-4
        .background-block.py-5.px-4.zoom-in
          .row
            .col-2(style="line-height: 90px;")
              img.icon-img(src='/images/icon-2.png')
            .col-10
              span(style="font-size: 32px;") Add your wallet address and customize your donation or tip page.
    .row.justify-content-md-center
      .col-sm-12.col-lg-7.py-4
        .background-block.py-5.px-4.zoom-in
          .row
            .col-2(style="line-height: 90px;")
              img.icon-img(src='/images/icon-3.png')
            .col-10
              span(style="font-size: 32px;") Publish your payment page and you're good to go!
section
  .container.col-xxl-10.px-4.pt-5
    .row.justify-content-md-center.pt-5
      .col-6
        h1.fw-bold.text-center ROTI BENEFITS
    .row.justify-content-md-center.py-5
      .col-10
        p.text-center(style="font-size: 22px;") Roti is powered by the Solana Pay network and offers a simple way for you to incorporate tips or donations on your website or application.
    .row.justify-content-md-center.pb-5
      .col-6
        h4.fw-bold.text-center With Roti, you get the following benefits: 
    .row.justify-content-md-center.py-5
      .col-md-12.col-lg-3
        .card
          .card-header.text-center.pt-4
            h3.pt-3 Fast transactions
          .wave.wave-1
          .px-3.py-0.card-body
            p.lead With Solana Pay, you receive your payments instantly
      .col-md-12.col-lg-3
        .card
          .card-header.text-center.pt-4
            h3.pt-3 Zero credit card fees
          .wave.wave-2
          .px-3.py-0.card-body
            p.lead Free yourself from credit card fees - Solana charges $0.001 per transaction
      .col-md-12.col-lg-3
        .card
          .card-header.text-center.pt-4
            h3.pt-3 Customizable payment page
          .wave.wave-3
          .px-3.py-0.card-body
            p.lead Create a custom branded payment page to engage your patrons
      .col-md-12.col-lg-3
        .card
          .card-header.text-center.pt-4
            h3.pt-3 No code
          .wave.wave-4
          .px-3.py-0.card-body
            p.lead No coding experience required
section.bottom-wave
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
  @keyframes slide {
    0%, 100% {
      transform: translateX(0px) translateY(0);
    }
    50% {
      transform: translateX(20px) translateY(4px);
    }
  }

  .slide-anim:hover {
    animation: slide 4s infinite;
  }

  .zoom-in {
    transition: all .25s ease;
  }

  .zoom-in:hover {
    transform: scale(1.03);
  }

  .wave-bg {
    height: 250px;
    background: url('../../public/images/wave-bg.svg');
    background-size: cover;
    background-position-y: top;
  }

  .bottom-wave {
    margin-top: 50px;
    width: 100%;
    height: 300px;
    background-size: contain !important;
    background: #60b764;
    background: url('../../public/images/bottom-wave.png');
  }

  .full-height {
    min-height: 100vh;
  }

  .big-height {
    min-height: 80vh;
  }

  .card-header {
    background-color: #60b764;
    user-select: none;
    height: 100px;
    width: 100%;
  }

  .card-body {
    min-height: 100px;
  }

  .card-body p {
    transform: translateY(-10px);
  }

  .card-header h3 {
    position: absolute;
    left: 0;
    width: 100%;
    z-index: 1000;
    color: #fff;
  }

  .wave {
    width: 100%;
    height: 100px;
    transform: translateY(-1px);
  }

  .wave-1 {
    background: url('../../public/images/wave-1.png');
    background-size: cover;
  }

  .wave-2 {
    background: url('../../public/images/wave-2.png');
    background-size: cover;
  }

  .wave-3 {
    background: url('../../public/images/wave-3.png');
    background-size: cover;
  }

  .wave-4 {
    background: url('../../public/images/wave-4.png');
    background-size: cover;
  }

  .background-block {
    user-select: none;
    border-radius: 10px;
    background-color: rgba(33, 37, 41, .5);
  }

  .background-block img.icon-img {
    width: auto;
    height: 70px;
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