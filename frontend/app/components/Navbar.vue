<template lang="pug">
.sidenav-header
  i#iconSidenav.fas.fa-times.p-3.cursor-pointer.text-white.opacity-5.position-absolute.end-0.top-0.d-none.d-xl-none(aria-hidden='true')
  a.navbar-brand.m-0(target='_blank')
    img.navbar-brand-img.h-100(src='https://cdn4.iconfinder.com/data/icons/programing-development-2/24/plugin_lego_brick_addon_program-512.png' alt='main_logo')
    span.ms-1.font-weight-bold.text-white Block Team
hr.horizontal.light.mt-0.mb-2
#sidenav-collapse-main.collapse.navbar-collapse.w-auto.h-auto
  ul.navbar-nav
    li.nav-item.mb-2.mt-0
      a.nav-link.text-white(data-bs-toggle='collapse' href='#ProfileNav' aria-controls='ProfileNav' role='button' aria-expanded='false')
        img.avatar(src='https://www.pnamarketing.com/wp-content/uploads/2019/03/27-270956_mario-face-png-super-mario-face-png.jpg')
        span.nav-link-text.ms-2.ps-1 Mario
      #ProfileNav.collapse.show(style='')
        ul.nav
          li.nav-item
            a.nav-link.text-white(href='../../../pages/pages/profile/overview.html')
              span.sidenav-mini-icon  MP 
              span.sidenav-normal.ms-3.ps-1 My Profile 
          li.nav-item
            a.nav-link.text-white(href='../../../pages/pages/account/settings.html')
              span.sidenav-mini-icon  S 
              span.sidenav-normal.ms-3.ps-1 Settings 
          li.nav-item
            a.nav-link.text-white(href='../../../pages/authentication/signin/basic.html')
              span.sidenav-mini-icon  L 
              span.sidenav-normal.ms-3.ps-1 Logout 
    hr.horizontal.light.mt-0
    li.nav-item
      h6.ps-4.ms-2.text-uppercase.text-xs.font-weight-bolder.text-white DOCS
    li.nav-item
      a.nav-link.text-white(data-bs-toggle='collapse' href='#componentsExamples' aria-controls='componentsExamples' role='button' aria-expanded='false')
        i.material-icons-round.if.else.endif(class="{% page.brand == 'RTL' %}ms-2{% %} me-2{% %}") view_in_ar
        span.nav-link-text.ms-2.ps-1 Components
      #componentsExamples.collapse.show
        ul.nav
          li.nav-item
            a.nav-link.text-white(href='https://www.creative-tim.com/learning-lab/bootstrap/alerts/material-dashboard' target='_blank')
              span.sidenav-mini-icon  A 
              span.sidenav-normal.ms-2.ps-1  Alerts 
          li.nav-item
            a.nav-link.text-white(href='https://www.creative-tim.com/learning-lab/bootstrap/badge/material-dashboard' target='_blank')
              span.sidenav-mini-icon  B 
              span.sidenav-normal.ms-2.ps-1  Badge 
    li.nav-item
      a.nav-link(href='https://github.com/creativetimofficial/ct-material-dashboard-pro/blob/master/CHANGELOG.md' target='_blank')
        i.material-icons-round.if.else.endif(class="{% page.brand == 'RTL' %}ms-2{% %} me-2{% %}") receipt_long
        span.nav-link-text.ms-2.ps-1 Changelog
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  }, 
  mounted() {}
}
</script>

<style scoped>
</style>