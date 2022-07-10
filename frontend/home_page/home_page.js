import * as Vue from 'vue';
import axios from 'axios'
import VueAxios from 'vue-axios'
import HomePage from './HomePage.vue';

Vue.createApp(HomePage)
.use(VueAxios, axios)
.mount('#HomePage');