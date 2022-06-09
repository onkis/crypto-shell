import {createWebHashHistory, createRouter} from 'vue-router';
import Setup from './pages/Setup.vue';
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
    path: "/payment-setup",
    name: "PaymentSetup",
    component: Setup 
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/payment-setup"
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkExactActiveClass: 'active'
});

export default router;