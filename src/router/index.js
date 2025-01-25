import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import ItemPage from '@/views/ItemPage.vue';
import LoginPage from '@/views/LoginPage.vue';
import ControleAcesso from '@/views/ControleUsuarios.vue';
import ChangePasswordPage from '@/views/ChangePasswordPage.vue';
import TestPage from '@/views/TestPage.vue'; 
import DashboardControle from '@/views/DashboardControle.vue';
import ControleEquipamentos from '@/views/ControleEquipamentos.vue'
import ControleUsuarios from '@/views/ControleUsuarios.vue';



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
    path: '/test',
    name: 'TestPage',
    component: TestPage,
  },
  {
    path: '/controle-usuarios',
    name: 'ControleUsuarios',
    component: ControleUsuarios,
  },
  {
    path: '/item/:category/:item',
    name: 'Item',
    component: ItemPage,
    props: true,
  },
  {
    path: '/change-password',
    name: 'ChangePasswordPage',
    component: ChangePasswordPage,
  },
  {
    path: '/dashboard-controle',
    name: 'DashboardControle',
    component: DashboardControle,
    meta: { requiresAuth: true }
  },
  {
    path: '/controle-equipamentos',
    name: 'ControleEquipamentos',
    component: ControleEquipamentos
  }
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;