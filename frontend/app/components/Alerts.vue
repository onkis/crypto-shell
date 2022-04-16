<template lang="pug">
.pt-3(style="width: 100%; padding: 0 var(--bs-gutter-x, 1.5rem); margin: 0 auto;")
  .alert.alert-primary.alert-dismissible.fade.show.mb-0(role='alert')
    span.alert-icon
      i.ni.ni-like-2
    span.alert-text {{ message }}
    button.btn-close(type='button' data-bs-dismiss='alert' aria-label='Close')
      span(aria-hidden='true') &times;
</template>

<script>
export default {
  components: {},
  data() {
    return {
      message: "Daisy Daisy... give me your answer do"
    };
  }, 
  mounted() {
    window.Alert
  },
  methods: {}
}
</script>

<style scoped>
</style>