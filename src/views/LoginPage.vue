<template>
  <div class="login-container">
    <div class="login-box">
      <h1>Login Inteligência IB</h1>
      <form @submit.prevent="handleSubmit">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="input-field"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Senha"
          class="input-field"
        />
        <button type="submit" class="login-button">Entrar</button>
        <!-- Campo para mensagens dinâmicas -->
        <p v-if="notification" class="notification">{{ notification }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import supabase from "@/utils/supabase";

export default {
  name: "LoginPage",
  setup() {
    const email = ref("");
    const password = ref("");
    const notification = ref("");
    const router = useRouter();

    const handleSubmit = async () => {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.value,
          password: password.value,
        });

        if (error) {
          console.log('Login error:', error.message);
          notification.value = 'Erro ao fazer login. Tente novamente.';
        } else if (data.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('firstLogin')
            .eq('user_id', data.user.id)
            .single();

          if (profile.firstLogin) {
            router.push('/change-password');
          } else {
            router.push('/home');
          }
        } else {
          notification.value = 'Erro ao fazer login. Usuário não encontrado.';
        }
      } catch (error) {
        console.error('Error logging in:', error.message);
        notification.value = 'Erro ao fazer login. Tente novamente.';
      }
    };

    return {
      email,
      password,
      notification,
      handleSubmit,
    };
  },
};
</script>

<style scoped>
/* Centraliza o container principal */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background-color: #f4f4f9; /* Cor de fundo */
}

/* Caixa de login */
.login-box {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background-color: #fff; /* Fundo branco */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: center;
}

/* Título */
.login-box h1 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

/* Campos de entrada */
.input-field {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

/* Botão de login */
.login-button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  background-color: #15803d; /* Verde padrão */
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.login-button:hover {
  background-color: #134e20; /* Verde mais escuro */
}

/* Notificação */
.notification {
  margin-top: 10px;
  color: #e63946; /* Vermelho para erros */
  font-size: 14px;
  font-weight: bold;
}
</style>
