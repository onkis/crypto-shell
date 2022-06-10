<template lang="pug">
#usersettings-page
  .container-fluid.py-4
    .row
      .col-lg-6
        h4 Payment History
        a(href="http://localhost:3000/ecommerce/Orders/order-list") Something like this

</template>

<script>
export default {
  components: {},
  data() {
    return {
      config: {}
    };
  }, 
  mounted() {
    this.init();
  },
  methods: {
    async init(){
    
    }
  }
}
</script>

<style scoped>
</style>