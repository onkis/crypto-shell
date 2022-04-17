<template lang="pug">
.pt-3(v-if="showAlert" style="width: 100%; padding: 0 var(--bs-gutter-x, 1.5rem); margin: 0 auto;")
  .alert.alert-success.alert-dismissible.fade.show.mb-0(role='alert')
    span.alert-icon
      i.ni.ni-like-2
    span.alert-text(style="color: #fff;") {{ message }}
    button.btn-close(v-if="showCloseButton" @click="closeAlert" type='button' data-bs-dismiss='alert' aria-label='Close' style="font-size: 30px; font-weight:900; padding: 0.25em;")
      span(aria-hidden='true') &times;
</template>

<script>
export default {
  components: {},
  data() {
    return {
      message: "Daisy Daisy... give me your answer do",
      showAlert: false,
      showCloseButton: false
    };
  }, 
  mounted() {
    this._initAlertManager();
  },
  methods: {
    _initAlertManager(){
      const that = this;
      window.AlertManager = (config) => {
        const { message, hideAfter, showCloseButton } = config;
        that.display(message, showCloseButton, hideAfter);
      };
    },
    closeAlert(){
      this.showAlert = false;
      this.message = null;
    },
    display(message, showCloseButton, hideAfter){
      const that = this;

      that.showCloseButton = showCloseButton;
      that.message = message;
      that.showAlert = true;
      if(hideAfter){
        setTimeout(() => {
          that.closeAlert();
        }, hideAfter);
      }
    }
  }
}
</script>

<style scoped>
</style>