<template>
  <div class="layout">
    <Sidebar />
    <div class="main-content">
      <Navbar />
      <div class="content-container">
        <div class="form-container">
          <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div class="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 class="font-medium text-black dark:text-white text-center">Cadastro de usuário</h3>
            </div>
            <form @submit.prevent="handleSubmit">
              <div class="p-6.5">
                <div class="mb-5">
                  <input v-model="nome" type="text" placeholder="Nome" class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" required />
                </div>
                <div class="mb-5">
                  <input v-model="cargo" type="text" placeholder="Cargo" class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" required />
                </div>
                <div class="mb-5">
                  <input v-model="email" type="email" placeholder="Email" class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" required />
                </div>
                <div class="mb-5">
                  <input v-model="senha" type="password" placeholder="Senha" class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" required />
                </div>
                <div class="mb-5.5">
                  <label for="adminProfile" class="mb-4.5 block text-sm font-medium text-black dark:text-white text-center">Permissão de usuário</label>
                  <div class="flex gap-2.5 justify-center">
                    <div>
                      <label class="relative flex cursor-pointer select-none items-center gap-2 text-sm font-medium text-black dark:text-white">
                        <input v-model="adminProfile" type="radio" name="adminProfile" :value="false" class="sr-only">
                        <span class="flex h-5 w-5 items-center justify-center rounded-full border border-primary">
                          <span class="h-2.5 w-2.5 rounded-full bg-primary" :class="{'hidden': adminProfile}"></span>
                        </span>
                        Padrão
                      </label>
                    </div>
                    <div>
                      <label class="relative flex cursor-pointer select-none items-center gap-2 text-sm font-medium text-black dark:text-white">
                        <input v-model="adminProfile" type="radio" name="adminProfile" :value="true" class="sr-only">
                        <span class="flex h-5 w-5 items-center justify-center rounded-full border border-body">
                          <span class="h-2.5 w-2.5 rounded-full bg-primary" :class="{'hidden': !adminProfile}"></span>
                        </span>
                        Administrador
                      </label>
                    </div>
                  </div>
                </div>
                <button type="submit" class="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">Cadastrar</button>
                <p v-if="notification.message" :class="['notification', notification.type]">{{ notification.message }}</p>
              </div>
            </form>
          </div>
        </div>
        <div class="table-wrapper">
          <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div class="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex items-center justify-between">
              <h3 class="font-medium text-black dark:text-white text-center flex-grow">Usuários cadastrados</h3>
              <input 
                v-model="searchQuery" 
                placeholder="Pesquisar usuários..." 
                class="border rounded px-2 py-1 w-64 text-sm"
              />
            </div>
            <div class="p-1">
              <div class="table-container">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome
                        <select v-model="sortOrder" @change="sortUsers" id="sortOrder" class="border rounded px-2 py-1 ml-2">
                          <option value="asc">A-Z</option>
                          <option value="desc">Z-A</option>
                        </select>
                      </th>
                      <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cargo</th>
                      <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Administrador
                        <select v-model="adminFilter" class="border rounded px-2 py-1 ml-2">
                          <option value="all">Todos</option>
                          <option value="admin">Sim</option>
                          <option value="standard">Não</option>
                        </select>
                      </th>
                      <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Último Acesso
                        <select v-model="lastAccessSort" class="border rounded px-2 py-1 ml-2">
                          <option value="recent">Mais recente</option>
                          <option value="oldest">Mais antigo</option>
                        </select>
                      </th>
                      <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="user in filteredAndSortedUsers" :key="user.id">
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.nome }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.cargo }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.email }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.adminProfile ? 'Sim' : 'Não' }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.ultimo_acesso ? formatDate(user.ultimo_acesso) : 'Não acessado' }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 relative">
                        <div class="relative">
                          <button 
                            @click="toggleActionMenu(user)" 
                            class="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-black shadow-11 hover:text-primary dark:bg-meta-4 dark:text-white dark:shadow-none">
                            Ações 
                            <svg class="fill-current" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M8.00039 11.4C7.85039 11.4 7.72539 11.35 7.60039 11.25L1.85039 5.60005C1.62539 5.37505 1.62539 5.02505 1.85039 4.80005C2.07539 4.57505 2.42539 4.57505 2.65039 4.80005L8.00039 10.025L13.3504 4.75005C13.5754 4.52505 13.9254 4.52505 14.1504 4.75005C14.3754 4.97505 14.3754 5.32505 14.1504 5.55005L8.40039 11.2C8.27539 11.325 8.15039 11.4 8.00039 11.4Z" fill=""></path>
                            </svg>
                          </button>
                          <div 
                            v-if="user.showActions" 
                            class="absolute right-0 z-10 w-full max-w-39.5 rounded-[5px] bg-white py-2.5 shadow-12 dark:bg-boxdark top-full mt-1">
                            <button 
                              @click="editUser(user)" 
                              class="flex w-full px-4 py-2 text-sm hover:bg-whiter hover:text-primary dark:hover:bg-meta-4">
                              Editar
                            </button>
                            <button 
                              @click="deleteUser(user)" 
                              class="flex w-full px-4 py-2 text-sm hover:bg-whiter hover:text-primary dark:hover:bg-meta-4">
                              Excluir
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ticker-wrapper">
        <Ticker />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import supabase from '@/utils/supabase';
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';
import Ticker from '@/components/Ticker.vue';

export default {
  name: 'ControleAcesso',
  components: {
    Navbar,
    Sidebar,
    Ticker,
  },
  setup() {
    const nome = ref('');
    const cargo = ref('');
    const email = ref('');
    const senha = ref('');
    const adminProfile = ref(false);
    const notification = ref({ message: "", type: "" });
    const users = ref([]);
    const sortOrder = ref('asc');
    const adminFilter = ref('all');
    const lastAccessSort = ref('recent');
    const searchQuery = ref('');

    const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
      return re.test(String(email).toLowerCase());
    };

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    };

    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, nome, cargo, adminProfile, user_email, ultimo_acesso, user_id');
      if (error) {
        console.error('Erro ao buscar usuários:', error.message);
      } else {
        users.value = data.map(user => {
          const adjustedAccessTime = user.ultimo_acesso ? new Date(new Date(user.ultimo_acesso).getTime() - 3 * 60 * 60 * 1000) : null;
          return {
            ...user,
            email: user.user_email,
            ultimo_acesso: adjustedAccessTime ? adjustedAccessTime.toISOString().slice(0, 19).replace('T', ' ') : null,
            showActions: false
          };
        });
      }
    };

    const filteredAndSortedUsers = computed(() => {
      let result = [...users.value];
      
      // Filtro de pesquisa
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        result = result.filter(user => 
          user.nome.toLowerCase().includes(query) ||
          user.cargo.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          (user.adminProfile ? 'sim' : 'não').includes(query) ||
          (user.ultimo_acesso ? formatDate(user.ultimo_acesso) : 'não acessado').toLowerCase().includes(query)
        );
      }
      
      // Filtro de administrador
      if (adminFilter.value === 'admin') {
        result = result.filter(user => user.adminProfile);
      } else if (adminFilter.value === 'standard') {
        result = result.filter(user => !user.adminProfile);
      }
      
      // Ordenação por nome
      result.sort((a, b) => {
        if (sortOrder.value === 'asc') {
          return a.nome.localeCompare(b.nome);
        } else {
          return b.nome.localeCompare(a.nome);
        }
      });

      // Ordenação por último acesso
      result.sort((a, b) => {
    if (!a.ultimo_acesso) return lastAccessSort.value === 'recent' ? 1 : -1;
    if (!b.ultimo_acesso) return lastAccessSort.value === 'recent' ? -1 : 1;
    
    return lastAccessSort.value === 'recent' 
      ? new Date(b.ultimo_acesso) - new Date(a.ultimo_acesso)
      : new Date(a.ultimo_acesso) - new Date(b.ultimo_acesso);
  });
  
  return result;
});

const handleSubmit = async () => {
  if (!validateEmail(email.value)) {
    notification.value = { message: 'Email inválido.', type: 'error' };
    setTimeout(() => {
      notification.value = { message: "", type: "" };
    }, 3000);
    return;
  }

  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: senha.value,
  });

  if (error) {
    notification.value = { message: `Erro ao criar usuário: ${error.message}`, type: 'error' };
    setTimeout(() => {
      notification.value = { message: "", type: "" };
    }, 3000);
    return;
  }

  let user = null;
  while (!user) {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) {
      notification.value = { message: `Erro ao obter usuário: ${userError.message}`, type: 'error' };
      setTimeout(() => {
        notification.value = { message: "", type: "" };
      }, 3000);
      return;
    }
    user = userData.user;
  }

  const uid = user.id;

  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .insert([
      { user_id: uid, nome: nome.value, cargo: cargo.value, user_email: email.value, adminProfile: adminProfile.value, firstLogin: true },
    ]);

  if (profileError) {
    notification.value = { message: `Erro ao adicionar usuário na tabela profiles: ${profileError.message}`, type: 'error' };
    setTimeout(() => {
      notification.value = { message: "", type: "" };
    }, 3000);
    return;
  }

  notification.value = { message: 'Usuário criado com sucesso!', type: 'success' };
  setTimeout(() => {
    notification.value = { message: "", type: "" };
  }, 3000);

  nome.value = '';
  cargo.value = '';
  email.value = '';
  senha.value = '';
  adminProfile.value = false;

  fetchUsers();
};

const toggleActionMenu = (user) => {
  users.value.forEach(u => {
    if (u.id !== user.id) u.showActions = false;
  });
  user.showActions = !user.showActions;
};

const editUser = (user) => {
  console.log('Editando usuário:', user);
  // Lógica de edição
};

const deleteUser = async (user) => {
  const confirmDelete = confirm(`Tem certeza que deseja excluir o usuário ${user.nome}?`);
  
  if (confirmDelete) {
    try {
      // Primeiro, exclui da tabela de autenticação usando a função de serviço de admin
      const { error: authError } = await supabase.auth.admin.deleteUser(user.user_id);
      
      if (authError) throw authError;

      // Depois, exclui da tabela de perfis
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('user_id', user.user_id);
      
      if (profileError) throw profileError;

      // Atualiza lista de usuários
      await fetchUsers();

      notification.value = { 
        message: 'Usuário excluído com sucesso!', 
        type: 'success' 
      };
    } catch (error) {
      notification.value = { 
        message: `Erro ao excluir usuário: ${error.message}`, 
        type: 'error' 
      };
    }

    // Limpa notificação após 3 segundos
    setTimeout(() => {
      notification.value = { message: "", type: "" };
    }, 3000);
  }
};

onMounted(fetchUsers);

return {
  nome,
  cargo,
  email,
  senha,
  adminProfile,
  notification,
  users,
  sortOrder,
  adminFilter,
  lastAccessSort,
  searchQuery,
  handleSubmit,
  formatDate,
  filteredAndSortedUsers,
  toggleActionMenu,
  editUser,
  deleteUser
};
},
};
</script>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.content-container {
  flex: 1;
  padding: 10px;
  display: flex;
  justify-content: space-between;
}

.form-container {
  width: 30%;
  margin: 0 auto;
}

.table-wrapper {
  width: 70%;
  margin-left: 10px;
}

.table-container {
  margin-top: 20px;
}

.ticker-wrapper {
  padding: 10px;
}

.notification {
  margin-top: 10px;
  font-size: 14px;
  font-weight: bold;
}

.notification.error {
  color: #e63946;
}

.notification.success {
  color: #15803d;
}
</style>
