import * as Vue from 'vue';
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router.js';
import App from './App.vue';

Vue.createApp(App)
.use(VueAxios, axios)
.use(router)
.mount('#app');