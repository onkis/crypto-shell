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
                .input-group.input-group-static.mb-2
                label Solana Network
                select.form-select( v-model="config.network")
                  option(value= 'mainnet-beta') Mainnet Beta
                  option(value='devnet') Devnet
                  option(value='testnet') Testnet
                
            .row.mt-4
              .col-lg-6.text-right.d-flex.flex-column.justify-content-center
              button.btn.bg-gradient-primary.mb-0.ms-lg-auto.me-lg-0.me-auto.mt-lg-0.mt-2(v-if="!is_published" @click="publish()" type='button') Publish
              button.btn.bg-gradient-warning.mb-0.ms-lg-auto.me-lg-0.me-auto.mt-lg-0.mt-2(v-if="is_published" @click="unpublish()" type='button') Unpublished
      .col-lg-8
        iframe#preview(v-bind:src="previewLink" style='width:140%; height:140%; transform: scale(0.7); transform-origin: 0; margin-top:-20%')
  validate-email-modal(
    :modalActive="openValidateEmailModal"
    @close="validateEmailModalClosed"
  )
  eula-modal(
    :modalActive="openEulaModal"
    @close="eulaModalClosed"
  )
</template>

<script>
import ValidateEmailModal from '../modals/ValidateEmailModal.vue';
import EulaModal from '../modals/EulaModal.vue';
import { debounce, isEmpty } from "lodash";

export default {
  components: { EulaModal, ValidateEmailModal },
  data() {
    return {
      previewLink: "",
      stage: 'donate',
      config: {},
      landingPageLink: null,
      is_published: null,
      hashId: null,
      openValidateEmailModal: false,
      openEulaModal: false,
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
  watch: {
    config: {
      handler(newValue, old) {
        if(!isEmpty(old)){
          this.debounceUpdate();
        }
      },
      deep: true
    }
  },
  mounted() {
    this.init();
    this.debounceUpdate = debounce(() => {
      this.update();
    }, 1000);
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
      this.is_published = data.is_published;
      this.previewLink = "/api/paymentpage/"+data.hashId+"/preview";
      this.landingPageLink = `//${process.env.BASE_URL}/p/${data.hashId}/${this.dashify(data.config.title || "")}`;
    },
    async publish(){
      const response = await this.$http.post("/api/paymentpage/3/publish");
      if(response?.data?.VALIDATE_EMAIL){
        this.openValidateEmailModal = true;
      }
      else if(response?.data?.EULA){
        this.openEulaModal = true;
      }
      else if(response){
        this.is_published = true;
        window.AlertManager({type: "success", "message": "Page Published!", hideAfter: 3000 });
      }
    },
    async unpublish(){
      const response = await this.$http.post("/api/paymentpage/3/unpublish");
      if(response){
        this.is_published = false;
        window.AlertManager({type: "success", "message": "Page Unpublished!", hideAfter: 3000 });
      }
    },
    async update(passedEula){
      const update = {
        config: { ...this.config }
      };

      if(passedEula) update.eula = true;

      //and one to update the logged in user's current page
      const response = await this.$http.put("/api/paymentpage/3", update);
      if(response){
        document.getElementById('preview').contentWindow.location.reload();
        window.AlertManager({type: "success", "message": "Setup Saved!", hideAfter: 3000 });
      }
    },
    chooseFiles(){
      document.getElementById("fileUpload").click();
    },
    async validateEmailModalClosed(modalResults){
      this.openValidateEmailModal = false;
      if(modalResults?.eventType !== 'success') return;
      else if(!modalResults?.email?.length) return console.error("no email");
      else{
        await this.$http.post("/api/user/validate_email", { email: modalResults.email });
      }
    },
    async eulaModalClosed(modalResults){
      this.openEulaModal = false;
      if(modalResults?.eventType !== 'agreed') return;
      else{
        const passedEula = true;
        await this.update(passedEula);
        await this.publish();
      }
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