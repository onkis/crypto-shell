<template lang="pug">
#setup-page.px-8
  .container-fluid.py-4
    .row
      .col-lg-4
        h4.font-semibold.text-lg Payment Setup
    .row
      .grid.grid-cols-6.grid-flow-col.gap-4.mt-6
        .col-span-2
          div(style="min-height: 350px;").rounded-lg.shadow-lg.bg-white.max-w-sm.p-4
            h5.pb-2.font-weight-bolder Configuration
            hr.my-2
            div
              label.block.text-sm.font-medium.text-gray-700 Donation Address
              .mt-1
                input(
                  v-model="config.address"
                  v-on:click="changePreview('donate')"
                  type='text'
                  placeholder='Donation Address'
                  class='focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                )#donationAddress.shadow-sm.block.w-full.border-gray-300.rounded-md
            .pt-4
              label.block.text-sm.font-medium.text-gray-700 Image
              .mt-1
                input(
                  v-model="config.logo"
                  v-on:click="changePreview('donate')"
                  type='text'
                  placeholder='Donation Address'
                  class='focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                )#image.shadow-sm.block.w-full.border-gray-300.rounded-md
            .pt-4
              button(
                @click="chooseFiles()"
                type='button'
                class='hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              ).inline-flex.items-center.px-3.py-2.border.border-transparent.text-sm.leading-4.font-medium.rounded-md.text-indigo-700.bg-indigo-100
                | Upload Image
                input.form-control#fileUpload(type="file", @change="uploadImage", hidden)
            .pt-4
              label.block.text-sm.font-medium.text-gray-700 Title
              .mt-1
                input(
                  v-model="config.title"
                  v-on:click="changePreview('donate')"
                  v-on:change="updatePageLink()"
                  type='text'
                  placeholder='Enter Title'
                  class='focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                )#image.shadow-sm.block.w-full.border-gray-300.rounded-md
            .pt-4
              label.block.text-sm.font-medium.text-gray-700 Details
              .mt-1
                input(
                  v-model="config.detail"
                  v-on:click="changePreview('donate')"
                  v-on:change="updatePageLink()"
                  type='text'
                  placeholder='Enter Details'
                  class='focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                )#image.shadow-sm.block.w-full.border-gray-300.rounded-md
            hr.my-4
            div
              label.block.text-sm.font-medium.text-gray-700 Completed Title
              .mt-1
                input(
                  v-model="config.completeTitle"
                  v-on:click="changePreview('complete')"
                  type='text'
                  placeholder='Enter Completed Title'
                  class='focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                ).shadow-sm.block.w-full.border-gray-300.rounded-md
            .pt-4
              label.block.text-sm.font-medium.text-gray-700 Completed Details
              .mt-1
                input(
                  v-model="config.completeDetails"
                  v-on:click="changePreview('complete')"
                  type='text'
                  placeholder='Enter Completed Details'
                  class='focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                ).shadow-sm.block.w-full.border-gray-300.rounded-md
            .pt-4
              label.block.text-sm.font-medium.text-gray-700 Location
                select(
                  v-model="config.network"
                  class='focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                ).mt-1.block.w-full.pl-3.pr-10.py-2.text-base.border-gray-300.rounded-md
                  option(value= 'mainnet-beta') Mainnet Beta
                  option(value='devnet') Devnet
                  option(value='testnet') Testnet
            .pt-4
              .col-lg-6.text-right.d-flex.flex-column.justify-content-center
              button(
                v-if="!is_published"
                @click="publish()"
                type='button'
                class='py-2.5 hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg'
              ).w-full.inline-block.items-center.px-6.bg-green-500.text-white.font-medium.text-xs.leading-tight.uppercase.rounded.shadow-md.transition.duration-150.ease-in-out Publish
              button(
                v-if="is_published"
                @click="unpublish()"
                type='button'
                class='py-2.5 hover:bg-yellow-600 hover:shadow-lg focus:bg-yellow-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-700 active:shadow-lg'
              ).inline-block.px-6.bg-yellow-500.text-white.font-medium.text-xs.leading-tight.uppercase.rounded.shadow-md.transition.duration-150.ease-in-out UnPublish
        .col-span-4
          div.rounded-lg.shadow-lg.bg-white.p-4.h-full
            div
              a(:href="landingPageLink" target='_blank') {{ landingPageLink }}
            hr.my-2
            iframe#preview(v-bind:src="previewLink" style='width:140%; height:140%; transform: scale(0.7); transform-origin: 0; margin-top:-20%')
  ValidateEmailModal(
    :modalActive="openValidateEmailModal"
    @close="validateEmailModalClosed"
  )
  EulaModal(
    :modalActive="openEulaModal"
    @close="eulaModalClosed"
  )
</template>

<script setup>
import { ref } from 'vue'
const openValidateEmailModal = ref(false);
const openEulaModal = ref(false);
</script>

<script>
import ValidateEmailModal from '../modals/ValidateEmailModal.vue';
import EulaModal from '../modals/EulaModal.vue';
import { debounce, isEmpty } from "lodash";

export default {
  components: { },
  data() {
    return {
      alertIsVisible: false,
      alertMessage: "",
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
      this.landingPageLink = `//${process.env.BASE_URL}/p/${this.hashId}/${this.dashify(this.config?.title) || ''}`;
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
      this.landingPageLink = `//${process.env.BASE_URL}/p/${data.hashId}/${this.dashify(data?.config?.title || "")}`;
    },
    async publish(){
      const response = await this.$http.post("/api/paymentpage/3/publish");
      if(response?.data?.VALIDATE_EMAIL){
        /* Must Validate Email  */
        this.openValidateEmailModal = true;
      }
      else if(response?.data?.EULA){
        /* Must Agree To Terms */
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
      this.openValidateEmailModal = false; /* CLOSE MODAL */
      if(modalResults?.eventType !== 'success') return;
      else if(!modalResults?.email?.length) return console.error("no email");
      else await this.$http.post("/api/user/validate_email", { email: modalResults.email });
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