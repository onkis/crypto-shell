import {createWebHashHistory, createRouter} from 'vue-router';
import PageSetup from './pages/PageSetup.vue';
import UserSettings from './pages/UserSettings.vue'
import PaymentHistory from './pages/PaymentHistory.vue'

const routes = [
  {
    path: "/user-setttings",
    name: "UserSettings",
    component: UserSettings
  },
  {
    path: "/payment-history",
    name: "PaymentHistory",
    component: PaymentHistory
  },
  {
    path: "/page-setup",
    name: "PageSetup",
    component: PageSetup 
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/page-setup"
  }
];

const router = createRouter({
  history: createWebHashHistory("/app"),
  routes,
  linkExactActiveClass: 'active'
});

export default router;