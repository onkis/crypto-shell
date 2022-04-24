<template lang="pug">
#donation
  .h-100.container-fluid
    .row
      .col-12
        .col-12.text-center 
          h3.mt-5 Crypto Shell Donations
          h5.text-secondary.font-weight-normal Trusted Transaction Platform
      .col-12
        .mb-5.multisteps-form
          .row
            .mx-auto.my-5.col-12.col-lg-8
              .card
                .card-header.p-0.position-relative.mt-n4.mx-3.z-index-2
                  .bg-gradient-success.shadow-success.border-radius-lg.pt-4.pb-3
                    .multisteps-form__progress
                      button.multisteps-form__progress-btn.position-relative(:class="{'js-active':(step >= 0)}")
                        span Details
                      button.multisteps-form__progress-btn.position-relative(:class="{'js-active':(step >= 1)}")
                        span Pay
                      button.multisteps-form__progress-btn.position-relative(:class="{'js-active':(step >= 2)}")
                        span Completed
                .card-body
                  form.multisteps-form__form
                    // STEP - DETAILS
                    .pt-3.bg-white.multisteps-form__panel(:class="{'js-active':(step === 0), 'position-relative':(step === 0)}" data-animation='FadeIn')
                      .text-center.row
                        .mx-auto.col-10
                          h5.font-weight-normal  Select Donation Amount
                      .multisteps-form__content
                        .mt-3.row
                          .col-12.col-sm-4.text-center
                            .avatar.avatar-xxl.position-relative
                              img.border-radius-md(src='data:image/jpeg;base64,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')
                          .mt-4.col-12.col-sm-8.mt-sm-0.text-start
                            .row
                              .col-6.mb-4
                                .d-block
                                  #CurrencyDropDown.choices.is-open(@click="toggleCurrencyDropdown" role='listbox')
                                    .choices__inner
                                      select#choices-category.form-control.choices__input(v-model="config.currency" name='choices-category' hidden='' tabindex='-1' data-choice='active')
                                      .choices__list.choices__list--single
                                        .choices__item.choices__item--selectable {{config.currency}}
                                    .choices__list.choices__list--dropdown(:class="{'is-active':(openCurrencyDropDown)}" style="z-index:10000000;")
                                      .choices__list(role='listbox')
                                        .choices__item.choices__item--choice.choices__item--selectable(@click="setCurrency('SOL')") SOL
                                        .choices__item.choices__item--choice.choices__item--selectable(@click="setCurrency('USDC')") USDC
                              .col-6.mb-4
                                .input-group.input-group-dynamic(:class="{'is-focused':(config.ammount != null)}")
                                  label.form-label Price
                                  input.form-control.form-control-default(v-model="config.ammount" type='number')
                            .d-block.mb-4
                              .input-group.input-group-dynamic(:class="{'is-focused':(config.first_name)}")
                                label.form-label First Name
                                input.form-control.form-control-default(v-model="config.first_name" type='text')
                            .d-block.mb-4
                              .input-group.input-group-dynamic(:class="{'is-focused':(config.last_name)}")
                                label.form-label Last Name
                                input.form-control.form-control-default(v-model="config.last_name" type='text')
                            .d-block.mb-4
                              .input-group.input-group-dynamic(:class="{'is-focused':(config.email)}")
                                label.form-label Email Address
                                input.form-control.form-control-default(v-model="config.email" type='email')
                        .mt-4.button-row.d-flex
                          button.mb-0.btn.bg-gradient-dark.ms-auto.js-btn-next(@click="next()" type='button' title='Next')  Next 
                    // STEP - PAY
                    .pt-3.bg-white.multisteps-form__panel(:class="{'js-active':(step === 1), 'position-relative':(step === 1)}" data-animation='FadeIn')
                      .row
                        .mx-auto.col-10
                          .col-lg-6.col-md-6.col-8.mx-auto
                            .nav-wrapper.position-relative.z-index-2
                              ul#tabs-pricing.nav.nav-pills.nav-fill.flex-row.p-1(role='tablist')
                                li.nav-item.pointer
                                  a#tabs-iconpricing-tab-1.nav-link.mb-0(@click="selectPayment('QR_CODE')") QR CODE
                                li.nav-item.pointer
                                  a#tabs-iconpricing-tab-2.nav-link.mb-0(@click="selectPayment('HD_WALLET')") HD WALLET
                                .moving-tab.position-absolute.nav-link.pointer(:class="{'show-qr-code':(paymentMethod === 'QR_CODE'), 'show-hd-wallet':(paymentMethod === 'HD_WALLET')}")
                                  a#tabs-iconpricing-tab-2.nav-link.mb-0.active -
                        .mx-auto.my-4.col-12
                          .row
                            .col-lg-7.col-md-7.col-7.mx-auto
                              .row
                                .col-lg-5.col-md-5.col-5.mx-auto
                                  .avatar.position-relative(style="height:auto; width: 100%;")
                                    img.border-radius-md(src='data:image/jpeg;base64,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')
                                .col-lg-7.col-md-7.col-7.mx-auto.pt-4
                                  h5.text-start Reedeming Grace Church
                                  h6.text-start NAME: {{config.first_name}} {{config.last_name}}
                                  h6.text-start EMAIL: {{config.email}}
                                  hr
                                  h4.text-start {{config.ammount}} - {{config.currency}}
                            .text-center.col-lg-5.col-md-5.col-5.mx-auto
                              #qrCode
                        .mt-4.button-row.d-flex
                          button.mb-0.btn.bg-gradient-light.js-btn-prev(@click="prev()" type='button' title='Prev')  Prev
                          button.mb-0.btn.bg-gradient-dark.ms-auto.js-btn-next(@click="next()" type='button' title='Next')  Next
                    // STEP - COMPLETED
                    .pt-3.bg-white.multisteps-form__panel(:class="{'js-active':(step === 2), 'position-relative':(step === 2)}" data-animation='FadeIn')
                      .text-center.row
                        .mx-auto.col-10
                          h5.font-weight-normal SUP BITCHES
</template>

<script>
import { PublicKey, Keypair, Connection, sendAndConfirmTransaction, Transaction } from '@solana/web3.js';
import { encodeURL, createQR, createTransaction, parseURL } from '@solana/pay';
import BigNumber from 'bignumber.js';

export default {
  components: {},
  data() {
    return {
      openCurrencyDropDown: false,
      steps: ["DETAILS", "PAY", "COMPLETED"],
      step: 1,
      config: {
        currency: "SOL"
      },
      paymentMethods: ["QR_CODE", "HD_WALLET"],
      paymentMethod: "QR_CODE"
    };
  },
  mounted() {
    this.buildQrCode();
  },
  methods: {
    buildQrCode(){
      const recipient = new PublicKey('wBgDX9D5sn9opVV4EQYDEvsLYT4intU5TttZRi7LqK8');
      const amount = new BigNumber(this.config.ammount),
            reference = new Keypair().publicKey,
            label = 'RGC Church',
            message = 'Order: #001234',
            memo = 'JC#4098',
            qrCodeSize = 250;
     
      const url = encodeURL({ recipient, amount, reference, label, message, memo });
      const qrCode = createQR(url, qrCodeSize);
      const element = document.getElementById('qrCode');
      qrCode.append(element);
    },
    next(){
      const stepIndex = this.steps.indexOf(this.step);
      const nextStep = this.steps[stepIndex + 1];

      if(nextStep === "DETAILS" && this.validConfig()){
        this.buildQrCode();
        this.step++;
      }
      else if(nextStep === "PAY"){
        this.step++;
      }
      else if(nextStep === "COMPLETED"){
        this.step++;
      }
    },
    offClick(e){
      const that = this;
      let close = true;
      e.path.forEach(el => {
        if(el.id === "CurrencyDropDown") close = false;
      });
      
      if(close){
        that.openCurrencyDropDown = false;
        document.removeEventListener("click", that.offClick);
      }
    },
    prev(){
      this.step--;
    },
    selectPayment(type){
      if(this.paymentMethods.includes(type)) this.paymentMethod = type;
    },
    setCurrency(currency){
      const SUPPORTED_CURRENCY = ["SOL", "USDC"];
      if(SUPPORTED_CURRENCY.includes(currency)){
        this.config.currency = currency;
      }
    },
    toggleCurrencyDropdown(){
      const that = this;
      that.openCurrencyDropDown = !that.openCurrencyDropDown;
      if(that.openCurrencyDropDown) document.addEventListener("click", that.offClick);
      else document.removeEventListener("click", that.offClick);
    },
    validConfig(){
      const SUPPORTED_CURRENCY = ["SOL", "USDC"];
      if(!SUPPORTED_CURRENCY.includes(this.config.currency)){
        return false;
      }
      if(!this.config.ammount){
        return false;
      }
      if(!this.config.first_name){
        return false;
      }
      if(!this.config.last_name){
        return false;
      }
      if(!this.config.email){
        return false;
      }
      return true;
    }
  }
};
</script>

<style scoped>
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
    width: calc(100% - 2px);
  }

  .choices__list--dropdown .choices__item.choices__item--selectable:hover {
    background: #f0f2f5;
    color: #344767;
  }
</style>