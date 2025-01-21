import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import ItemPage from '@/views/ItemPage.vue';
import LoginPage from '@/views/LoginPage.vue';
import ControleAcesso from '@/views/ControleAcesso.vue';
import ChangePasswordPage from '@/views/ChangePasswordPage.vue';

const routes = [
  {
    path: '/',
    name: 'ReturnLoginPage',
    component: LoginPage,
  },
  {
    path: '/home',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/controle-de-acesso',
    name: 'ControleAcesso',
    component: ControleAcesso,
  },
  {
    path: '/item/:category/:item', // Rota dinâmica com categoria e item
    name: 'Item',
    component: ItemPage,
    props: true, // Passa "category" e "item" como props para ItemPage
  },
  {
    path: '/change-password',
    name: 'ChangePasswordPage',
    component: ChangePasswordPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;