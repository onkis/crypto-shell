<template lang="pug">
main#donation
  div.container.marketing
    //hr.featurette-divider  
    .row.featurette
      .col-md-7(v-if="stage ==='complete'")
        h2.featurette-heading.fw-normal.lh-1 {{donationConfig.completeTitle}}
        p.lead {{ donationConfig.completeDetails }}
      .col-md-7(v-if="stage ==='verifying'")
        h2.featurette-heading.fw-normal.lh-1 Verifying Transaction...
        p.lead Please Wait
        hr
        svg(xmlns='http://www.w3.org/2000/svg', xmlns:xlink='http://www.w3.org/1999/xlink', style='margin:auto;background:#fff;display:block;', width='254px', height='254px', viewBox='0 0 100 100', preserveAspectRatio='xMidYMid')
            g(transform='rotate(0 50 50)')
              rect(x='48.5', y='24', rx='1.32', ry='1.32', width='3', height='12', fill='#9844ff')
                animate(attributeName='opacity', values='1;0', keyTimes='0;1', dur='1s', begin='-0.9166666666666666s', repeatCount='indefinite')
            g(transform='rotate(30 50 50)')
              rect(x='48.5', y='24', rx='1.32', ry='1.32', width='3', height='12', fill='#9844ff')
                animate(attributeName='opacity', values='1;0', keyTimes='0;1', dur='1s', begin='-0.8333333333333334s', repeatCount='indefinite')
            g(transform='rotate(60 50 50)')
              rect(x='48.5', y='24', rx='1.32', ry='1.32', width='3', height='12', fill='#9844ff')
                animate(attributeName='opacity', values='1;0', keyTimes='0;1', dur='1s', begin='-0.75s', repeatCount='indefinite')
            g(transform='rotate(90 50 50)')
              rect(x='48.5', y='24', rx='1.32', ry='1.32', width='3', height='12', fill='#9844ff')
                animate(attributeName='opacity', values='1;0', keyTimes='0;1', dur='1s', begin='-0.6666666666666666s', repeatCount='indefinite')
            g(transform='rotate(120 50 50)')
              rect(x='48.5', y='24', rx='1.32', ry='1.32', width='3', height='12', fill='#9844ff')
                animate(attributeName='opacity', values='1;0', keyTimes='0;1', dur='1s', begin='-0.5833333333333334s', repeatCount='indefinite')
            g(transform='rotate(150 50 50)')
              rect(x='48.5', y='24', rx='1.32', ry='1.32', width='3', height='12', fill='#9844ff')
                animate(attributeName='opacity', values='1;0', keyTimes='0;1', dur='1s', begin='-0.5s', repeatCount='indefinite')
            g(transform='rotate(180 50 50)')
              rect(x='48.5', y='24', rx='1.32', ry='1.32', width='3', height='12', fill='#9844ff')
                animate(attributeName='opacity', values='1;0', keyTimes='0;1', dur='1s', begin='-0.4166666666666667s', repeatCount='indefinite')
            g(transform='rotate(210 50 50)')
              rect(x='48.5', y='24', rx='1.32', ry='1.32', width='3', height='12', fill='#9844ff')
                animate(attributeName='opacity', values='1;0', keyTimes='0;1', dur='1s', begin='-0.3333333333333333s', repeatCount='indefinite')
            g(transform='rotate(240 50 50)')
              rect(x='48.5', y='24', rx='1.32', ry='1.32', width='3', height='12', fill='#9844ff')
                animate(attributeName='opacity', values='1;0', keyTimes='0;1', dur='1s', begin='-0.25s', repeatCount='indefinite')
            g(transform='rotate(270 50 50)')
              rect(x='48.5', y='24', rx='1.32', ry='1.32', width='3', height='12', fill='#9844ff')
                animate(attributeName='opacity', values='1;0', keyTimes='0;1', dur='1s', begin='-0.16666666666666666s', repeatCount='indefinite')
            g(transform='rotate(300 50 50)')
              rect(x='48.5', y='24', rx='1.32', ry='1.32', width='3', height='12', fill='#9844ff')
                animate(attributeName='opacity', values='1;0', keyTimes='0;1', dur='1s', begin='-0.08333333333333333s', repeatCount='indefinite')
            g(transform='rotate(330 50 50)')
              rect(x='48.5', y='24', rx='1.32', ry='1.32', width='3', height='12', fill='#9844ff')
                animate(attributeName='opacity', values='1;0', keyTimes='0;1', dur='1s', begin='0s', repeatCount='indefinite')

      .col-md-7(v-if="stage === 'donate'")
        h2.featurette-heading.fw-normal.lh-1 {{donationConfig.title || standard.title}}
        p.lead {{ donationConfig.detail || standard.detail }}
        hr
        .row
          .col-md-6
        .row(v-if="stage === 'donate'")
          .col-lg-6
            form.row.g-3
              .col-md-12
                label.form-label(for='FirstName') First Name
                input#FirstName.form-control(type='text', placeholder='First name', aria-label='First name', v-model="config.first_name")
              .col-md-12
                label.form-label(for='LastName') Last Name  
                input#LastName.form-control(type='text', placeholder='Last name', aria-label='Last name', v-model="config.last_name" )
              .col-md-12
                label.form-label(for='Email') Email
                input#Email.form-control(type='email', placeholder='Email', v-model="config.email")
              .col-md-12
                div.row
                  .col
                    label.form-label Select Token
                    select.form-select(@change="setCurrency($event)")
                      option(value= '')
                      option(value='USDC') USDC
                      option(value='SOL') SOL
                  .col
                    label.form-label(for="Ammount") Ammount
                    input#Ammount.form-control(v-model="config.ammount", min=0, type='number')
          .col-lg-6
            div.row(v-if="validConfig && paymentMethod !== 'QR_CODE'")
              div.d-grid.vstack.gap-3.col-md-12.mx-auto(style="margin-top:16px;")
                div(v-if="isPhantomInstalled && config.currency !=='USDC'")
                  a.btn.btn-primary.btn-lg.px-4.me-md-2.login-with-button(type="button", @click="payWithPhantom()") Pay With Phantom
                // div(v-if="isBraveInstalled")
                //   a.btn.btn-primary.btn-lg.px-4.me-md-2(type="button", @click="payWithBrave()") Pay With Brave
                div
                  a.btn.btn-outline-secondary.btn-lg.px-4(type="button", @click="buildQrCode") Pay With SolanaPay
      
            div.row(v-if="validConfig && paymentMethod === 'QR_CODE'")
              .qr-container
                #qrCode
      .col-md-5
        #imageBackground(:style="{backgroundImage:`url(${donationConfig.logo})`}")
    footer.d-flex.flex-wrap.justify-content-between.align-items-center.py-3.my-4.border-top
      .col-md-4.d-flex.align-items-center
        span.mb-3.mb-md-0.text-muted Cluster Url: {{clusterApiUrl}}
      ul.nav.col-md-4.justify-content-end.list-unstyled.d-flex

</template>
<script>
import { PublicKey, Keypair, Connection, sendAndConfirmTransaction, Transaction, clusterApiUrl } from '@solana/web3.js';
import { encodeURL, createQR, createTransfer, parseURL, findReference } from '@solana/pay';
import BigNumber from 'bignumber.js';
import {isPhantomInstalled, connectToPhantom, connectToBrave, isBraveInstalled} from '../lib/wallet.js';
import { SPL_ADDR } from '../../lib/solana_spl.mjs';
export default {
  components: {},
  data() {
    return {
      stage: "donate",
      assetId: null,
      donationConfig: {...DONATION_CONFIG},
      config: {
        currency: "SOL",
        paymentMethod: "Select..."
      },
      paymentMethod: "",
      clusterApiUrl: "",
      phantomWallet: null,
      braveWallet: null,
      isPhantomInstalled: isPhantomInstalled(),
      isBraveInstalled: isBraveInstalled(),
      network: ""
    };
  },
  computed: {
    validConfig(){
      const SUPPORTED_CURRENCY = ["SOL", "USDC"];
      if(!SUPPORTED_CURRENCY.includes(this.config.currency)) return false;
      if(!this.config.ammount) return false;
      if(!this.config.first_name) return false;
      if(!this.config.last_name) return false;
      if(!this.config.email) return false;

      return true;
    }
  },
  async mounted() {
    this.network = this.donationConfig.network || "testnet";
    
    const urlParams = new URLSearchParams(window.location.search);
    
    const CLUSTER_API_URL = clusterApiUrl(this.network);
    
    this.clusterApiUrl = CLUSTER_API_URL;
    
    this.connection = new Connection(CLUSTER_API_URL, 'confirmed');
        
    this.assetId = document.location.pathname.split("/")[2];
  },
  methods: {
    async buildQrCode(){
      const that = this;
      const { address, label } = this.donationConfig;
      that.paymentMethod = "QR_CODE";
      /* Get donation record from server */
      await this._createDonation();

      /* Must have reference id */
      if(!this.transaction_ref_id){
        console.error("no transaction_ref_id");
        return;
      }

      /* Remove old SVG qr-code (if exists) */
      this._removeQrCodeSvg();

      /* Defining all values needed for a qr code */
      const recipient = new PublicKey(address),
            amount = new BigNumber(this.config.ammount),
            reference = new PublicKey(this.transaction_ref_id),
            //message = 'Order: #001234',
            //memo = 'JC#4098',
            qrCodeSize = 275;

      /* Creating qr-code + appending to DOM */
      let blob = { recipient, amount, reference /*, label, message, memo*/ };
      
      //TODO set the SPL token on the blob object if this.config.currency !== SOL
      if(this.config.currency !== 'SOL'){
        //TS is shit. you literally have to create a public key object
        //just so this splToken can convert it BACK TO A FUCKING STRING
        //You know accepting multiple types as function arguments actually makes
        //programming BETTER
        const SPLMintAddress = new PublicKey(SPL_ADDR[this.network][this.config.currency].address);
        blob.splToken = SPLMintAddress;
      }
      
      console.log("blob", blob);
      
      const url = encodeURL(blob);
      
      
      const qrCode = createQR(url, qrCodeSize);
      const element = document.getElementById('qrCode');
      qrCode.append(element);

      /* Polling blockchain for reference id */
      let count = 1, found = false;
      that.interval = setInterval(async () => {
        try {
          /* reference id found! */
          signatureInfo = await findReference(that.connection, reference, { finality: 'confirmed' });
          clearInterval(that.interval);
          if(!found){
            found = true;

            [err, response] = await that._askServerToVerifyTransaction(that.transaction_ref_id);
            if(err) return console.error(err);
            else if(response.status === 200) that.setStage("complete");
          }
        }
        catch (error) {
          if (!error.message.includes("not found")){
            console.error(error);
            clearInterval(that.interval);
          }
          else if(count > 5 * 60){ /* 5 MINUTES */
            clearInterval(that.interval);
          }
        }
      }, 5000);
    },
    
    
    async payWithBrave(){
      this.braveWallet = await connectToBrave();
      if(!this.braveWallet) return;
      else {
        await this._payWithWallet(this.braveWallet);
      }
    },
    
    async payWithPhantom(){
      this.phantomWallet = await connectToPhantom();
      if(!this.phantomWallet) return;
      else {
        await this._payWithWallet(this.phantomWallet);
      }
    },
    
    async _payWithWallet(wallet){
      var that = this;
      //create a donation record on the server...Seems like an odd place to do it?
      await this._createDonation();
      
      [err, tx] = await that._createTransaction(wallet.publicKey);
      if(err) return console.error(err);
      
      [err] = await wallet.signAndSendTransaction(tx)
      if(err) return console.error(err);
      that.setStage("verifying");
      [err, response] = await that._askServerToVerifyTransaction(this.transaction_ref_id);
      if(err) return console.error(err);
      else if(response.status === 200) that.setStage("complete");
    },
    
    
    async _createDonation(){
      const amount = new BigNumber(this.config.ammount),
            asset_id = this.assetId,
            donation_config = { ...this.config };

      const response = await this.$http.post("/api/donation", {  amount, asset_id, donation_config });
      this.transaction_ref_id = response.data.transaction_ref_id;
      return this.transaction_ref_id;
    },
    
    setStage(stage){
      const validStage = { donate: true, complete: true, verifying: true};
      if(!validStage[stage]){
        console.error("invalid stage | ./frontend/donation_page/DonationPage.vue");
        return;
      }
      else this.stage = stage;
    },
    
    // setPaymentType(type, label){
    //   const that = this;
    //   if(!that.paymentMethods.includes(type)) return;
    //   that.config.paymentMethod = label;
    //   that.paymentMethod = type;
    //   this.buildQrCode();
    // },
    
    setCurrency(event){
      let currency = event.target.value;
      const SUPPORTED_CURRENCY = ["SOL", "USDC"];
      if(SUPPORTED_CURRENCY.includes(currency)){
        this.config.currency = currency;
      }
    },
    async _createTransaction(senderPublicKey){
      const that = this;
      const { address, label } = this.donationConfig;
      
      const recipient = new PublicKey(address),
            reference = new PublicKey(this.transaction_ref_id),
            amount = new BigNumber(this.config.ammount),
            memo = label;
      try{
        const tx = await createTransfer(this.connection, senderPublicKey, { recipient, amount, reference, memo });
        tx.feePayer = senderPublicKey;
        return [null, tx];
      }
      catch(err){
        console.error("failed to create tx | DonationPage.vue#_createTransaction", err);
        
        alert(err);
        return [err];
      }
    },
    async _askServerToVerifyTransaction(transaction_ref_id){
      //TODO pass in the net used for the page
      const that = this;
      try{
        let params = new URLSearchParams({network: that.network});
        const url = `/api/donation/${transaction_ref_id}/verify?`+params.toString();
        response = await that.$http.post(url);
        return [null, response];
      }
      catch(err){
        console.error("failed to post donation to server | DonationPage.vue#createTransactionAndPromptWalletExtension", err);
        return [err];
      }
    },
    _removeQrCodeSvg(){
      const oldQrCode = document.querySelector('#qrCode svg');
      if(oldQrCode) oldQrCode.remove();
    }
  }
};
</script>

<style scoped>
  #imageBackground{
    background-position: center;
    background-size: cover;
    border-radius: 5px;
    width: 500px;
    height: 500px;
  }

  #buttonSpan{
    display: inline-block;
    width: 100%;
    text-align: center;
    color: rgb(255, 255, 255);
    background: rgb(0, 0, 0);
    font-weight: 500;
    font-size: 25px;
    padding: 2px 10px;
    border-radius: 5px;
    cursor: pointer;
    position: relative;
  }

  .qr-container {
    /* width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1000000;
    background: rgba(0,0,0,0.5);
    border-radius: 5px; */
  }

  #qrCode{
    width: 275px;
    height: 275px;
    border-radius: 15px;
    overflow: hidden;
  }

  .moving-tab{
    padding: 0px;
    transition: all 0.5s ease 0s;
    width: 120px;
  }

  .pointer{
    cursor: pointer;
  }

  .show-qr-code{
    width: 48%;
    padding-left: 2px;
  }

  .show-hd-wallet{
    padding-left: 45%;
    width: calc(100% - 8px);
  }

  .choices__list--dropdown .choices__item.choices__item--selectable:hover {
    background: #f0f2f5;
    color: #344767;
  }

  .full-width {
    width: 100% !important;
  }

</style>