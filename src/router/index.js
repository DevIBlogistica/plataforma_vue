import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/views/LoginPage.vue'; 
import HomePage from '@/views/HomePage.vue'; 
import ItemPage from '@/components/ItemPage.vue';
import { categories } from "@/utils/categories";
import ControleAcesso from '@/components/ControleAcesso.vue';
import ChangePasswordPage from '@/views/ChangePasswordPage.vue';


// Cria rotas dinamicamente com base na estrutura de categorias
const dynamicRoutes = Object.entries(categories).flatMap(([category, items]) =>
  items.map((item) => ({
    path: `/${category}/${item}`,
    name: `${category}-${item}`,
    component: ItemPage,
    props: { category, item },
  }))
);

const routes = [
  {
    path: '/',
    name: 'LoginPage', 
    component: LoginPage,
  },
  {
    path: '/login',
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
    path: "/:category/:item", // Rota dinâmica com categoria e item
    name: "item",
    component: ItemPage,
    props: true, // Passa "category" e "item" como props para ItemPage
  },
  {
    path: '/change-password',
    name: 'ChangePasswordPage',
    component: ChangePasswordPage,
  },
  ...dynamicRoutes, // Adiciona as rotas dinâmicas
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

/*xport default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});*/