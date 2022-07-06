<template lang="pug">
#setup-page
  .container-fluid.py-4
    .row
      .col-lg-4
        h4 Payment Setup
    .row
      .col-lg-4
      .col-lg-8
        a(:href="landingPageLink" target='_blank') {{ landingPageLink }}
    .row.mt-5
      .col-lg-4.mt-lg-0.mt-4
        .card
          .card-body
            h5.font-weight-bolder Configuration
            hr
            .row.mt-4
              .col-12
                .input-group.input-group-static.mb-2
                  label Payment Address
                  input#donationAddress.form-control(v-model="config.address" type='text' placeholder='Donation Address' v-on:click="changePreview('donate')")
              .col-12
                .input-group.input-group-static.mb-2
                  label Logo
                  input#label.form-control(v-model="config.logo" type='text' placeholder='Logo Src' v-on:click="changePreview('donate')")
                button.button.btn.bg-gradient-primary(@click="chooseFiles()") Upload File
                .input-group.input-group-static.mb-2
                  input.form-control#fileUpload(type="file", @change="uploadImage", hidden)
              .col-12
                .input-group.input-group-static.mb-2
                  label Title
                  input#label.form-control(v-model="config.title" type='text' placeholder='Enter Title' v-on:click="changePreview('donate')" v-on:change="updatePageLink()")
              .col-12
                .input-group.input-group-static.mb-2
                  label Details
                  input#detail.form-control(v-model="config.detail" type='text' placeholder='Enter Details' v-on:click="changePreview('donate')")
              .col-12
                .input-group.input-group-static.mb-2
                  label Completed Title
                  input#detail.form-control(v-model="config.completeTitle" type='text' placeholder='Enter Completed Title' v-on:click="changePreview('complete')")
              .col-12
                .input-group.input-group-static.mb-2
                  label Completed Details
                  input#detail.form-control(v-model="config.completeDetails" type='text' placeholder='Enter Completed Details' v-on:click="changePreview('complete')")
              .col-12
            .row.mt-4
              .col-lg-6.text-right.d-flex.flex-column.justify-content-center
              button.btn.bg-gradient-primary.mb-0.ms-lg-auto.me-lg-0.me-auto.mt-lg-0.mt-2(@click="update()" type='button') Save
      .col-lg-8
        #preview(style="pointer-events:none;")
          .card
            .card-header.p-0.position-relative.mt-n4.mx-3.z-index-2
              a.d-block.blur-shadow-image
                #imageBackground(:style="{backgroundImage:`url(${logo})`}" style="background-position: center;background-size: cover;height: 35vh;min-height: 300px;width: 100%;border-radius: 5px;")
            .card-body
              #stage_donate(v-if="stage === 'donate'")
                h3.font-weight-normal {{config.title || standard.title}}
                p.mt-2
                  | {{ config.detail || standard.detail }}
                hr
                .control-container
                  .row
                    .col-12.mb-4
                      .input-group.input-group-dynamic
                        label.form-label First Name
                        input.form-control.form-control-default(type='text')
                    .col-12.mb-4
                      .d-block
                        .input-group.input-group-dynamic
                          label.form-label Last Name
                          input.form-control.form-control-default(type='text')
                    .col-12.mb-4
                      .d-block
                        .input-group.input-group-dynamic
                          label.form-label Email Address
                          input.form-control.form-control-default(type='email')
                  .row.mt-2
                    .col-3
                      .d-block
                        #CurrencyDropDown.choices.is-open(role='listbox')
                          .choices__inner
                            select#choices-category.form-control.choices__input(v-model="config.currency" name='choices-category' hidden='' tabindex='-1' data-choice='active')
                            .choices__list.choices__list--single
                              .choices__item.choices__item--selectable USDC
                          .choices__list.choices__list--dropdown(:class="{'is-active':(openCurrencyDropDown)}" style="z-index:10000000;")
                            .choices__list(role='listbox')
                              .choices__item.choices__item--choice.choices__item--selectable(@click="setCurrency('SOL')") SOL
                              .choices__item.choices__item--choice.choices__item--selectable(@click="setCurrency('USDC')") USDC
                    .col-3
                      .input-group.input-group-dynamic(:class="{'is-focused':(config.ammount != null)}")
                        label.form-label Price
                        input.form-control.form-control-default(v-model="config.ammount" type='number')
                    .col-6.mb-4
                      .mx-auto.col-12
                        .col-12.col-8.mx-auto
                          .nav-wrapper.position-relative.z-index-2
                            ul#tabs-pricing.nav.nav-pills.nav-fill.flex-row.p-1(role='tablist')
                              li.nav-item.pointer
                                a#tabs-iconpricing-tab-1.nav-link.mb-0 QR CODE
                              li.nav-item.pointer
                                a#tabs-iconpricing-tab-2.nav-link.mb-0 HD WALLET
                              .moving-tab.position-absolute.nav-link.pointer(style="padding: 0px; padding-left: calc(50% - 8px); padding-right: 8px; width: 100%;")
                                a#tabs-iconpricing-tab-2.nav-link.mb-0.active -
                    .col-12
                      span(style="display: inline-block;width: 100%;text-align: center;color: rgb(255, 255, 255);background: rgb(0, 0, 0);font-weight: 500;font-size: 25px;padding: 2px 10px;border-radius: 5px;cursor: pointer;position: relative;")
                        | Donate With 
                        img(src='/images/sp-white-gradient.svg' style='margin-top: -4px;')

              #stage_complete(v-if="stage === 'complete'")
                .mt-n6.mx-auto
                  button.btn.bg-gradient-success.btn-sm.mb-0.me-2(type='button' name='button')  Edit 
                  button.btn.btn-outline-dark.btn-sm.mb-0(type='button' name='button')  Remove 
                h3.font-weight-normal.mt-4.text-center {{config.completeTitle || standard.completeTitle}}
                hr
                p.mt-2
                  | {{ config.completeDetails || standard.completeDetails }}

</template>

<script>
export default {
  components: {},
  data() {
    return {
      stage: 'donate',
      config: {},
      landingPageLink: null,
      hashId: null,
      standard: {
        title: 'JOIN THE CLEANUP',
        logo: 'https://assets.theoceancleanup.com/app/uploads/2021/08/Tender-Inspection-Flight-24.08.2021-pre-meetings-3-1280x720.jpg',
        detail: 'Your donation will be made to The Ocean Cleanup North Pacific Foundation, a registered 501(c)(3) foundation',
        completeTitle: 'THANK YOU!',
        completeDetails: 'Thanks for your generous contribution to support #TeamSeas! Every single dollar will help clean one pound of trash from a river, beach or ocean around the world.'
      }
    };
  }, 
  computed: {
    logo(){
      if(this.config.logo) return this.config.logo;
      else return this.standard.logo;
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    changePreview(newStage){
      this.stage = newStage;
    },
    
    updatePageLink(){
      this.landingPageLink = `//${process.env.BASE_URL}/p/${this.hashId}/${this.dashify(this.config.title)}`;
    },
    
    async init(){
      console.log("init!");
      //TODO: there should be only one endpoint to get the logged in users
      //current page
      const response = await this.$http("/api/paymentpage/3");
      const { data } = response;

      this.id = data.id;
      this.hashId = data.hashId;
      this.config = { ...data.config };
      this.landingPageLink = `//${process.env.BASE_URL}/p/${data.hashId}/${this.dashify(data.config.title)}`;
    },
    async update(){
      const update = {
        config: { ...this.config }
      };
      //and one to update the logged in user's current page
      const response = await this.$http.put("/api/paymentpage/3", update);
      if(response){
        window.AlertManager({type: "success", "message": "Setup Saved!", hideAfter: 3000 });
      }
    },
    chooseFiles(){
      document.getElementById("fileUpload").click();
    },
    uploadImage(event) {
      let imageFile = event.target.files[0];
      if (imageFile) {
        // check the file type to be image
        if (!imageFile.type.includes("image")) {
          window.AlertManager({type: "error", "message": "Invalid File Type", hideAfter: 3000 });
        }
        else {
          let data = new FormData();
          data.append("file", imageFile);
          let uploadUrl = "/api/file-upload/"+this.id;
          
          this.$http.post(uploadUrl, data)
            .then((res) => { 
              this.config.logo = res.data.filePath;
            })
            .catch((err) => {
              console.error("error uploading image", err);
              window.AlertManager({type: "error", "message": "Error Uploading Image", hideAfter: 3000 });

            });
        }
      }
    },
    /**
     * convers a string to dashes
     * 
     * https://github.com/jeffreypriebe/dashify
     * MIT license
     * @param {String} str - the string to dashify
     */
     dashify(str) {
      if (typeof str !== 'string') {
        throw new TypeError('expected a string');
      }
      str = str.replace(/([a-z])([A-Z])/g, '$1-$2');
      str = str.replace(/[ \t\W]/g, '-');
      str = str.replace(/^-+|-+$/g, '');
      str = str.replace(/-+/g, '-');
      return encodeURIComponent(str.toLowerCase());
    }
  }
}
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>