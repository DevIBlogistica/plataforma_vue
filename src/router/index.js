import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import ItemPage from '@/views/ItemPage.vue';
import LoginPage from '@/views/LoginPage.vue';
import ControleAcesso from '@/views/ControleUsuarios.vue';
import ChangePasswordPage from '@/views/ChangePasswordPage.vue';
import TestPage from '@/views/TestPage.vue'; 
import DashboardControle from '@/views/DashboardControle.vue';
import ControleUsuarios from '@/views/ControleUsuarios.vue';
import ControleArquivos from '@/views/ControleArquivos.vue';
import ControleRetiradas from '@/views/ControleRetiradas.vue';
import CadastroEquipamentos from '@/views/CadastroEquipamentos.vue';



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
    path: '/controle-retiradas',
    name: 'ControleRetiradas',
    component: ControleRetiradas
  },
  {
    path: '/controle-arquivos',
    name: 'ControleArquivos',
    component: ControleArquivos
  },
  {
    path: '/cadastro-equipamentos',
    name: 'CadastroEquipamentos',
    component: CadastroEquipamentos
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;