import {createWebHashHistory, createRouter} from 'vue-router';
import Setup from './pages/Setup.vue';

const routes = [
  {
    path: "/setup",
    name: "setup",
    component: Setup 
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/setup"
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkExactActiveClass: 'active'
});

export default router;