<template lang="pug">
main.main-content.mt-0
  .page-header.align-items-start.min-height-300.m-3.border-radius-xl(style="background-image: url('https://images.unsplash.com/photo-1491466424936-e304919aada7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1949&q=80');")
    span.mask.bg-gradient-dark.opacity-6
  .container.mb-4
    .row.mt-lg-n12.mt-md-n12.mt-n12.justify-content-center
      .col-xl-8.col-lg-5.col-md-10.mx-auto
        .card.mt-8
          .card-header.p-0.position-relative.mt-n4.mx-10.z-index-2
            .bg-gradient-success.shadow-success.border-radius-lg.py-3.pe-1.text-center.py-4
              h4.font-weight-bolder.text-white.mt-1 Setup
              p.mb-1.text-sm.text-white Configure Your Donation Button
          .card-body HELLO WORLD {{ name }}
</template>

<script>
export default {
  components: {},
  data() {
    return {
      name: "jimmy"
    };
  }, 
  mounted() {
    this.init();
  },
  methods: {
    init(){
      console.log("init");
    }
  }
}
</script>

<style scoped>
</style>