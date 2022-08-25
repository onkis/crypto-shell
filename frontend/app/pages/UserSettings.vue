<template lang="pug">
#usersettings-page
  .container-fluid.py-4
    .row
      #delete.card.mt-4
          .card-header
            h5 User Settings
          .card-body.d-sm-flex.pt-0
            p.text-sm Email Address: {{email}}


</template>

<script>
export default {
  components: {},
  data() {
    return {
      email: null
    };
  }, 
  mounted() {
    this.init();
  },
  methods: {
    async init(){
      const response = await this.$http("/api/user/current");
      const { data } = response;
      this.email = data.email;
      
    }
  }
}
</script>

<style scoped>
</style>