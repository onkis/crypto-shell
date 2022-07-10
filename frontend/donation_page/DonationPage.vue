<template lang="pug">
#donation
  .h-100.container-fluid
    .row.justify-content-md-center
      .col-md-7.mt-5
        .card
          .card-header.p-0.position-relative.mt-n4.mx-3.z-index-2
            .qr-container(v-if="validConfig && paymentMethod === 'QR_CODE'")
              #qrCode
            a.d-block.blur-shadow-image
              #imageBackground(:style="{backgroundImage:`url(${donationConfig.logo})`}")
            .colored-shadow(style="background-image:url('../../assets/img/products/product-11.jpg');")
          .card-body
            #stage_donate(v-if="stage === 'donate'")
              h3.font-weight-normal {{donationConfig.title || standard.title}}
              p.mt-2
                | {{ donationConfig.detail || standard.detail }}
              hr
              .control-container
                .row
                  .col-12.mb-4
                    .input-group.input-group-dynamic(:class="{'is-focused':(config.first_name)}")
                      label.form-label First Name
                      input.form-control.form-control-default(v-model="config.first_name" type='text')
                  .col-12.mb-4
                    .d-block
                      .input-group.input-group-dynamic(:class="{'is-focused':(config.last_name)}")
                        label.form-label Last Name
                        input.form-control.form-control-default(v-model="config.last_name" type='text')
                  .col-12.mb-4
                    .d-block
                      .input-group.input-group-dynamic(:class="{'is-focused':(config.email)}")
                        label.form-label Email Address
                        input.form-control.form-control-default(v-model="config.email" type='email')
                .row
                  .col-3.mb-4
                    .d-block
                      #CurrencyDropDown.choices.is-open(@click="toggleCurrencyDropdownElement" role='listbox')
                        .choices__inner
                          select#choices-category.form-control.choices__input(v-model="config.currency" name='choices-category' hidden='' tabindex='-1' data-choice='active')
                          .choices__list.choices__list--single
                            .choices__item.choices__item--selectable {{config.currency}}
                        .choices__list.choices__list--dropdown(:class="{'is-active':(openCurrencyDropDown)}" style="z-index:10000000;")
                          .choices__list(role='listbox')
                            .choices__item.choices__item--choice.choices__item--selectable(@click="setCurrency('SOL')") SOL
                            .choices__item.choices__item--choice.choices__item--selectable(@click="setCurrency('USDC')") USDC
                  .col-3.mb-4
                    .input-group.input-group-dynamic(:class="{'is-focused':(config.ammount != null)}")
                      label.form-label Price
                      input.form-control.form-control-default(v-model="config.ammount" min='0' type='number')
                  .col-6.mb-4(v-if="validConfig")
                    .mx-auto.col-12
                      .col-12.col-8.mx-auto
                        .nav-wrapper.position-relative.z-index-2
                          ul#tabs-pricing.nav.nav-pills.nav-fill.flex-row.p-1(role='tablist')
                            li.nav-item.pointer
                              a#tabs-iconpricing-tab-1.nav-link.mb-0(@click="setPaymentType('QR_CODE')") QR CODE
                            li.nav-item.pointer
                              a#tabs-iconpricing-tab-2.nav-link.mb-0(@click="setPaymentType('HD_WALLET')") HD WALLET
                            .moving-tab.position-absolute.nav-link.pointer(:class="{'show-qr-code':(paymentMethod === 'QR_CODE'), 'show-hd-wallet':(paymentMethod === 'HD_WALLET')}")
                              a#tabs-iconpricing-tab-2.nav-link.mb-0.active -
                  .col-12(v-if="validConfig && paymentMethod === 'HD_WALLET'")
                    wallet-multi-button

                    span#buttonSpan(@click="handleClickToPayWithWalletExtension()")
                      | Donate With 
                      img(src='/images/sp-white-gradient.svg' style='margin-top: -4px;')
            #stage_complete(v-if="stage === 'complete'")
              .mt-n6.mx-auto
                button.btn.bg-gradient-success.btn-sm.mb-0.me-2(type='button' name='button')  Edit 
                button.btn.btn-outline-dark.btn-sm.mb-0(type='button' name='button')  Remove 
              h3.font-weight-normal.mt-4.text-center {{donationConfig.completeTitle}}
              hr
              p.mt-2
                | {{ donationConfig.completeDetails}}
</template>

<script>
import { PublicKey, Keypair, Connection, sendAndConfirmTransaction, Transaction, clusterApiUrl } from '@solana/web3.js';
import { encodeURL, createQR, createTransfer, parseURL, findReference } from '@solana/pay';
import BigNumber from 'bignumber.js';
// import { WalletMultiButton } from 'solana-wallets-vue'
import { useWallet } from 'solana-wallets-vue';
import { WalletMultiButton } from 'solana-wallets-vue'

export default {
  components: {WalletMultiButton},
  data() {
    return {
      stage: "donate",
      assetId: null,
      donationConfig: {...DONATION_CONFIG},
      donationInstance: null,
      openCurrencyDropDown: false,
      config: {
        currency: "SOL"
      },
      paymentMethods: ["QR_CODE", "HD_WALLET"],
      paymentMethod: "HD_WALLET",
      walletConnected: false
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
    const urlParams = new URLSearchParams(window.location.search);
    const MAIN_NET = false;
    const CLUSTER = clusterApiUrl((MAIN_NET) ? "mainnet" : "testnet");

    this.connection = new Connection(CLUSTER, 'confirmed');
    
    const { wallets } = useWallet();
    
    console.log(wallets)
    
    this.assetId = document.location.pathname.split("/")[2];
  },
  methods: {
    async buildQrCode(){
      const that = this;
      const { address, label } = this.donationConfig;
      
      /* Get donation record from server */
      await this.createDonation();

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
            message = 'Order: #001234',
            memo = 'JC#4098',
            qrCodeSize = 275;

      /* Creating qr-code + appending to DOM */
      const url = encodeURL({ recipient, amount, reference, label, message, memo });
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
    async handleClickToPayWithWalletExtension(){
      const { wallet, connected } = useWallet();
      const solanaWallet = wallet._value._wallet;

      if(!connected.value){
        try{
          await this.connectToSolanaWalletExtension();
        }
        catch(e){
          console.error("FAILED TO CONNECT WALLET | ./frontend/donation_page/DonationPage.vue", e);
          return;
        }
      }

      await this.createDonation();
      await this.createTransactionAndPromptWalletExtension();
    },
    async createDonation(){
      const amount = new BigNumber(this.config.ammount),
            asset_id = this.assetId,
            donation_config = { ...this.config };

      const response = await this.$http.post("/api/donation", {  amount, asset_id, donation_config });
      this.transaction_ref_id = response.data.transaction_ref_id;
      return this.transaction_ref_id;
    },
    setStage(stage){
      const validStage = { donate: true, complete: true};
      if(!validStage[stage]){
        console.error("invalid stage | ./frontend/donation_page/DonationPage.vue");
        return;
      }
      else this.stage = stage;
    },
    setPaymentType(type){
      const that = this;
      if(!that.paymentMethods.includes(type)) return;

      that.paymentMethod = type;
      this.buildQrCode();
    },
    setCurrency(currency){
      const SUPPORTED_CURRENCY = ["SOL", "USDC"];
      if(SUPPORTED_CURRENCY.includes(currency)){
        this.config.currency = currency;
      }
    },
    toggleCurrencyDropdownElement(){
      const that = this;
      that.openCurrencyDropDown = !that.openCurrencyDropDown;
      if(that.openCurrencyDropDown) document.addEventListener("click", that._offClick);
      else document.removeEventListener("click", that._offClick);
    },
    async connectToSolanaWalletExtension(){
      const { solana } = window;
      if (solana.isPhantom) {
        console.log("👻 Connecting To Phantom");
        const response = await solana.connect();
        this.publicKey = response.publicKey;
        this.provider = response;
        this.walletConnected = true;

        console.log(`👻 Connected with Public Key:`, this.publicKey);
      }
    },
    async createTransactionAndPromptWalletExtension(){
      let tx, signedTransaction, response;
      const that = this;

      /* 1. create tx */
      [err, tx] = await that._createTransaction();
      if(err) return console.error(err);

      /* 2. prompt user to sign */
      [err] = await that._signTransaction(tx);
      if(err) return console.error(err);

      /* 3. ask the server to verify */
      [err, response] = await that._askServerToVerifyTransaction(this.transaction_ref_id);
      if(err) return console.error(err);
      else if(response.status === 200) that.setStage("complete");
    },
    async _createTransaction(){
      const that = this;
      const { wallet, publicKey } = useWallet();
      const { address, label } = this.donationConfig;
      const public_address = publicKey._value;

      const solana = wallet._value._wallet;
      const recipient = new PublicKey(address),
            reference = new PublicKey(this.transaction_ref_id),
            amount = new BigNumber(this.config.ammount),
            memo = label;

      try{
        const tx = await createTransfer(this.connection, public_address, { recipient, amount, reference, memo });
        tx.feePayer = public_address;
        return [null, tx];
      }
      catch(err){
        console.error("failed to create tx | DonationPage.vue#_createTransaction", err);
        return [err];
      }
    },
    async _signTransaction(transaction){
      try{
        const signedTransaction = await window.solana.signAndSendTransaction(transaction);
        return [null, signedTransaction];
      }
      catch(err){
        console.log("failed to signAndSendTransaction", err);
        return [err];
      }
    },
    async _askServerToVerifyTransaction(transaction_ref_id){
      const that = this;
      try{
        const url = `/api/donation/${transaction_ref_id}/verify`;
        response = await that.$http.post(url);
        return [null, response];
      }
      catch(err){
        console.error("failed to post donation to server | DonationPage.vue#createTransactionAndPromptWalletExtension", err);
        return [err];
      }
    },
    _offClick(e){
      const that = this;
      let close = true;
      e.path.forEach(el => {
        if(el.id === "CurrencyDropDown") close = false;
      });
      
      if(close){
        that.openCurrencyDropDown = false;
        document.removeEventListener("click", that._offClick);
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
    height: 35vh;
    min-height: 300px;
    width: 100%;
    border-radius: 5px;
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
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1000000;
    background: rgba(0,0,0,0.5);
    border-radius: 5px;
  }

  #qrCode{
    position: absolute;
    width: 275px;
    height: 275px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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