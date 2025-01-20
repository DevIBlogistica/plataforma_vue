import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/views/LoginPage.vue'; // Certifique-se de que o caminho está correto
import HomePage from '@/views/HomePage.vue'; // Certifique-se de que o caminho está correto
import ItemPage from '@/components/ItemPage.vue'; // Certifique-se de que o caminho está correto
import { categories } from "@/utils/categories"; // Certifique-se de que o caminho está correto

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