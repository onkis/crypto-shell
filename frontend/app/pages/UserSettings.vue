<template lang="pug">
.bg-white.shadow.overflow-hidden.m-5(class='sm:rounded-lg')
  .px-4.py-5(class='sm:px-6')
    h3.text-lg.leading-6.font-medium.text-gray-900 User Information
  .border-t.border-gray-200.px-4.py-5(class='sm:p-0')
    dl(class='sm:divide-y sm:divide-gray-200')
      .py-4(class='sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6')
        dt.text-sm.font-medium.text-gray-500 Email Address
        dd.mt-1.text-sm.text-gray-900(class='sm:mt-0 sm:col-span-2') {{email}}

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