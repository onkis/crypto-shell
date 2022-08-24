<template lang="pug">
.pt-3(v-if="showAlert" style="width: 100%; padding: 0 var(--bs-gutter-x, 1.5rem); margin: 0 auto;")
  .alert.alert-dismissible.fade.show.mb-0(
    :class="{'alert-success': (type === 'success'), 'alert-info': (type === 'info'), 'alert-danger': (type === 'danger')}" 
    role='alert'
  )
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
      currentAlert: 1, /* Using this for alert ID */
      type: "success",
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
        that.display({...config});
      };
    },
    closeAlert(){
      this.showAlert = false;
      this.message = null;
    },
    display(config){
      const { type, message, hideAfter, showCloseButton } = config;
      const that = this;
      
      that.currentAlert = that.currentAlert + 1;
      const id = that.currentAlert;

      if(type) that.type = type;
      that.showCloseButton = showCloseButton;
      that.message = message;
      that.showAlert = true;
      
      if(hideAfter){
        setTimeout(() => {
          if(that.currentAlert === id) that.closeAlert(); /* If current alert is still the same then remove */
        }, hideAfter);
      }
    }
  }
}
</script>

<style scoped>
</style>