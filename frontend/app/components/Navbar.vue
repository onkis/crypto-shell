<template lang="pug">
.sidenav-header
  i#iconSidenav.fas.fa-times.p-3.cursor-pointer.text-white.opacity-5.position-absolute.end-0.top-0.d-none.d-xl-none(aria-hidden='true')
  a.navbar-brand.m-0(target='_blank')
    img.navbar-brand-img.h-100(src='https://cdn4.iconfinder.com/data/icons/programing-development-2/24/plugin_lego_brick_addon_program-512.png' alt='main_logo')
    span.ms-1.font-weight-bold.text-white Oilbirt
hr.horizontal.light.mt-0.mb-2
#sidenav-collapse-main.collapse.navbar-collapse.w-auto.h-auto
  ul.navbar-nav
    li.nav-item
      router-link.nav-link.text-white(:to='{name: "UserSettings"}')
        span.sidenav-mini-icon  US 
        span.sidenav-normal.ms-3.ps-1 User Settings 
    li.nav-item
      router-link.nav-link.text-white(:to='{name: "PaymentSetup"}')
        span.sidenav-mini-icon  PS 
        span.sidenav-normal.ms-3.ps-1 Payment Setup
    li.nav-item
      a.nav-link.text-white(to='/logout')
        span.sidenav-mini-icon  L 
        span.sidenav-normal.ms-3.ps-1 Logout 
    hr.horizontal.light.mt-0
</template>

<script>
export default {
  components: {},
  data() {
    return {
      openUser: false
    };
  }, 
  mounted() {},
  methods: {
    toggleUser(){
      this.openUser = !this.openUser;
    }
  }
}
</script>

<style scoped>
</style>