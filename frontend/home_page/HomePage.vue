<template lang="pug">
.container.col-xxl-8.px-4.py-5
  .row.flex-lg-row-reverse.align-items-center.g-5.py-5
    .col-10.col-sm-8.col-lg-6
      img.d-block.mx-lg-auto.img-fluid.no-cursor-events(src="/images/roti-logo.gif", alt="Roti Logo", width="700", height="500", loading="lazy")
    .col-lg-6
      h1.display-5.fw-bold.lh-1.mb-3 Accept USDC & SOL
      p.lead Easily Accept USDC and SOL for domains or tips
      .d-grid.gap-2.d-md-flex.justify-content-md-start
        a.btn.btn-primary.btn-lg.px-4.me-md-2(type="button", style="background-color:#60b764; border-color:#60b764") Login With Wallet
        a.btn.btn-outline-secondary.btn-lg.px-4(type="button", href="/login") Login With Email
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {}
};
</script>

<style scoped>
  .no-cursor-events {
    pointer-events: none;
    user-select: none;
  }
</style>