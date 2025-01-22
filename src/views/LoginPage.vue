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
        <p v-if="notification.message" :class="['notification', notification.type]">{{ notification.message }}</p>
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
    const notification = ref({ message: "", type: "" });
    const router = useRouter();

    const handleSubmit = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (error) {
      console.log('Login error:', error.message);
      notification.value = { message: 'Erro ao fazer login. Tente novamente.', type: 'error' };
    } else if (data.user) {
      // Atualizar último acesso no perfil
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ ultimo_acesso: new Date() })
        .eq('user_id', data.user.id);

      if (updateError) {
        console.error('Erro ao atualizar último acesso:', updateError.message);
        notification.value = { message: 'Erro ao atualizar último acesso.', type: 'error' };
        return;
      }

      // Verificar o campo firstLogin
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('firstLogin')
        .eq('user_id', data.user.id)
        .single();

      if (profileError) {
        notification.value = { message: `Erro ao obter dados do perfil: ${profileError.message}`, type: 'error' };
        setTimeout(() => {
          notification.value = { message: "", type: "" };
        }, 3000);
        return;
      }

      if (profileData.firstLogin) {
        notification.value = { message: "Primeiro login detectado. Por favor, troque sua senha.", type: 'success' };
        setTimeout(() => {
          notification.value = { message: "", type: "" };
          router.push("/change-password"); // Redirecionar para a página de troca de senha
        }, 3000);
        return;
      }

      notification.value = { message: "Login bem-sucedido!", type: 'success' };
      setTimeout(() => {
        notification.value = { message: "", type: "" };
        router.push("/home"); // Redirecionar para a página do dashboard após o login bem-sucedido
      }, 1000);
    } else {
      notification.value = { message: 'Erro ao fazer login. Usuário não encontrado.', type: 'error' };
    }
  } catch (error) {
    console.error('Error logging in:', error.message);
    notification.value = { message: 'Erro ao fazer login. Tente novamente.', type: 'error' };
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
  font-size: 14px;
  font-weight: bold;
}

.notification.error {
  color: #e63946; /* Vermelho para erros */
}

.notification.success {
  color: #15803d; /* Verde para sucesso */
}
</style>