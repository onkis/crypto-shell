<template lang="pug">
transition(name="modal-animation")
  .modal-backdrop(v-show="modalActive")
    .modal.show
      transition(name="modal-animation-inner")
        .modal-inner.modal-dialog.modal-dialog-centered(v-show="modalActive" role='document')
          .modal-content
            .modal-header
              h5 Send Validate Email
            .modal-body
              .input-group.input-group-outline.mb-2
                input#emailAddress.form-control(v-model="email" type='text' placeholder='Email')
            .modal-footer
              button.btn.bg-gradient-secondary(@click="handleCancel()" type='button') Cancel
              button.btn.bg-gradient-primary(@click="handleValidate()" type='button') Validate
</template>

<script>
export default {
  props: ['modalActive'],
  components: {},
  data() {
    return {
      email: ''
    };
  }, 
  methods: {
    handleCancel(){
      this.close({ eventType: "cancel" });
    },
    handleValidate(){
      if(!this.email.length) return;
      this.close({ eventType: "success", email: this.email });
    },
    close(props){
      this.$emit('close', props);
    }
  }
}
</script>

<style scoped>
.modal-animation-enter-active,
.modal-animation-leave-active {
  transition: opacity .3s cubic-bezier(0.52,0.02,0.19,1.02);
}

.modal-animation-enter-from,
.modal-animation-leave-to {
  opacity: 0;
}

.modal-animation-enter-to {
  opacity: 1;
}

.modal-animation-inner-enter-active {
  transition: all .4s cubic-bezier(0.52,0.02,0.19,1.02);
  transition-delay: .1s;
}

.modal-animation-inner-leave-active {
  transition: all .4s cubic-bezier(0.52,0.02,0.19,1.02);
}

.modal-animation-inner-enter-from {
  opacity: 0;
  transform: translateY(-55px) !important;
}

.modal-animation-inner-leave-to {
  transform: translateY(-55px) !important;
}

.modal-backdrop{
  background-color: rgba(0,0,0,0.45);
  z-index: 1000000;
}

.modal.show {
  display: block;
  z-index: 1000;
}
</style>