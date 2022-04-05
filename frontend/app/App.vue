<template lang="pug">
// Page Navigation?
aside.sidenav.navbar.navbar-vertical.navbar-expand-xs.border-0.border-radius-xl.my-3.fixed-start.ms-3.bg-gradient-dark
  navbar
main.main-content.mt-0
  router-view
</template>

<script>
import Navbar from './components/Navbar.vue';
export default {
  components: {Navbar},
  data() {
    return {};
  }, 
  mounted() {},
  methods: {
    hi(){
      console.log("hi");
    }
  }
};
</script>

<style scoped>
</style>