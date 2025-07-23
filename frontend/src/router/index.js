import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';
import AdminDashboard from '../views/AdminDashboard.vue';
import TLDashboard from '../views/TLDashboard.vue';
import EmployeeDashboard from '../views/EmployeeDashboard.vue';

const routes = [
  { path: '/', component: Login },
  { path: '/signup', component: Signup },
  { path: '/admin', component: AdminDashboard },
  { path: '/tl', component: TLDashboard },
  { path: '/employee', component: EmployeeDashboard }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router; 