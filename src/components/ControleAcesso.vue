<template>
    <div>
      <Navbar />
      <div class="layout">
        <Sidebar />
        <div class="main-content">
          <div class="controle-acesso">
            <h2>Criar Novo Usuário</h2>
            <form @submit.prevent="handleSubmit">
              <input v-model="nome" type="text" placeholder="Nome" required />
              <input v-model="cargo" type="text" placeholder="Cargo" required />
              <input v-model="email" type="email" placeholder="Email" required />
              <input v-model="senha" type="password" placeholder="Senha" required />
              <label class="checkbox-label">
                <input v-model="adminProfile" type="checkbox" />
                Admin Profile
              </label>
              <button type="submit">Salvar</button>
              <p v-if="notification" class="notification">{{ notification }}</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import supabase from '@/utils/supabase';
  import Navbar from './Navbar.vue';
  import Sidebar from './Sidebar.vue';
  
  export default {
    name: 'ControleAcesso',
    components: {
      Navbar,
      Sidebar,
    },
    setup() {
      const nome = ref('');
      const cargo = ref('');
      const email = ref('');
      const senha = ref('');
      const adminProfile = ref(false);
      const notification = ref('');
  
      const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
      };
  
      const handleSubmit = async () => {
        if (!validateEmail(email.value)) {
          notification.value = 'Email inválido.';
          setTimeout(() => {
            notification.value = '';
          }, 3000);
          return;
        }
  
        const { data, error } = await supabase.auth.signUp({
          email: email.value,
          password: senha.value,
        });
  
        if (error) {
          notification.value = `Erro ao criar usuário: ${error.message}`;
          setTimeout(() => {
            notification.value = '';
          }, 3000);
          return;
        }
  
        // Esperar até que o usuário seja confirmado
        let user = null;
        while (!user) {
          const { data: userData, error: userError } = await supabase.auth.getUser();
          if (userError) {
            notification.value = `Erro ao obter usuário: ${userError.message}`;
            setTimeout(() => {
              notification.value = '';
            }, 3000);
            return;
          }
          user = userData.user;
        }
  
        const uid = user.id;
  
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .insert([
            { user_id: uid, nome: nome.value, cargo: cargo.value, adminProfile: adminProfile.value },
          ]);
  
        if (profileError) {
          notification.value = `Erro ao adicionar usuário na tabela profiles: ${profileError.message}`;
          setTimeout(() => {
            notification.value = '';
          }, 3000);
          return;
        }
  
        notification.value = 'Usuário criado com sucesso!';
        setTimeout(() => {
          notification.value = '';
        }, 3000);
  
        // Limpar os campos do formulário após a criação do usuário
        nome.value = '';
        cargo.value = '';
        email.value = '';
        senha.value = '';
        adminProfile.value = false;
      };
  
      return {
        nome,
        cargo,
        email,
        senha,
        adminProfile,
        notification,
        handleSubmit,
      };
    },
  };
  </script>
  
  <style scoped>
  .layout {
    display: flex;
  }
  
  .main-content {
    flex: 1;
    padding: 20px;
    min-height: 100vh; /* Garante que o conteúdo ocupe pelo menos a altura da tela */
  }
  
  .controle-acesso {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff; /* Adiciona um fundo branco */
  }
  
  .controle-acesso h2 {
    margin-bottom: 20px;
  }
  
  .controle-acesso form {
    display: flex;
    flex-direction: column;
  }
  
  .controle-acesso form input {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .controle-acesso form label.checkbox-label {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  }
  
  .controle-acesso form label.checkbox-label input {
    margin-right: 10px;
  }
  
  .controle-acesso form button {
    padding: 10px;
    background-color: #333;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .controle-acesso form button:hover {
    background-color: #555;
  }
  
  .notification {
    margin-top: 10px;
    color: #e63946; /* Vermelho para erros */
    font-size: 14px;
    font-weight: bold;
  }
  </style>