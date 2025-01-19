import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/views/LoginPage.vue'; // Página de login
import HomePage from '@/views/HomePage.vue'; // Página inicial
import ItemPage from '@/components/ItemPage.vue'; // Página de item dinâmica
import { categories } from "@/utils/categories"; // Importa a estrutura de dados

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
    name: 'LoginPage', 
    component: LoginPage,
  },
  {
    path: '/home',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: "/:category/:item", // Rota dinâmica com categoria e item
    name: "item",
    component: ItemPage,
    props: true, // Passa "category" e "item" como props para ItemPage
  },
  ...dynamicRoutes, // Adiciona as rotas dinâmicas
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
