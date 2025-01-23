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
            <div class="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 class="font-medium text-black dark:text-white text-center">Usuários cadastrados</h3>
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
                      <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Administrador</th>
                      <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Último Acesso</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="user in sortedUsers" :key="user.id">
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.nome }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.cargo }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.email }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.adminProfile ? 'Sim' : 'Não' }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.ultimo_acesso ? formatDate(user.ultimo_acesso) : 'Não acessado' }}</td>
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
        .select('id, nome, cargo, adminProfile, user_email, ultimo_acesso');
      if (error) {
        console.error('Erro ao buscar usuários:', error.message);
      } else {
        users.value = data.map(user => {
          const adjustedAccessTime = user.ultimo_acesso ? new Date(new Date(user.ultimo_acesso).getTime() - 3 * 60 * 60 * 1000) : null;
          return {
            ...user,
            email: user.user_email,
            ultimo_acesso: adjustedAccessTime ? adjustedAccessTime.toISOString().slice(0, 19).replace('T', ' ') : null
          };
        });
      }
    };

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
      console.log({ data, error });

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

    const sortUsers = () => {
      users.value.sort((a, b) => {
        if (sortOrder.value === 'asc') {
          return a.nome.localeCompare(b.nome);
        } else {
          return b.nome.localeCompare(a.nome);
        }
      });
    };

    const sortedUsers = computed(() => {
      return [...users.value].sort((a, b) => {
        if (sortOrder.value === 'asc') {
          return a.nome.localeCompare(b.nome);
        } else {
          return b.nome.localeCompare(a.nome);
        }
      });
    });

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
      handleSubmit,
      formatDate,
      sortUsers,
      sortedUsers,
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
  margin-left: 20px;
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