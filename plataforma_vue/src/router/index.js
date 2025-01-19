import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/views/LoginPage.vue';
import HomePage from '@/views/HomePage.vue';

const routes = [
  {
    path: '/',
    name: 'LoginPage',  // Use nome mais descritivo da rota
    component: LoginPage,
  },
  {
    path: '/home',
    name: 'HomePage',  // Use nome mais descritivo da rota
    component: HomePage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
