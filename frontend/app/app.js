import * as Vue from 'vue';
import router from './router.js';
import App from './App.vue';

Vue.createApp(App)
.use(router)
.mount('#app');