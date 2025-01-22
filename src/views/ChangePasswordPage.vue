<template>
  <div class="change-password-container">
    <div class="change-password-box">
      <p>Como este é seu primeiro acesso, você precisa alterar sua senha.</p>
      <form @submit.prevent="handleChangePassword">
        <input
          v-model="newPassword"
          type="password"
          placeholder="Nova senha"
          class="input-field"
        />
        <input
          v-model="confirmPassword"
          type="password"
          placeholder="Confirme a nova senha"
          class="input-field"
        />
        <button type="submit" class="change-password-button">Alterar senha</button>
        <p v-if="notification.message" :class="['notification', notification.type]">{{ notification.message }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import supabase from "@/utils/supabase";
import { useRouter } from "vue-router";

export default {
  name: "ChangePasswordPage",
  setup() {
    const newPassword = ref("");
    const confirmPassword = ref("");
    const notification = ref({ message: "", type: "" });
    const router = useRouter();

    const handleChangePassword = async () => {
      if (newPassword.value !== confirmPassword.value) {
        notification.value = { message: "As senhas não coincidem.", type: "error" };
        return;
      }

      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError) {
          notification.value = { message: `Erro ao obter usuário: ${userError.message}`, type: "error" };
          return;
        }

        const { error: updateError } = await supabase.auth.updateUser({
          password: newPassword.value,
        });

        if (updateError) {
          notification.value = { message: `Erro ao alterar senha: ${updateError.message}`, type: "error" };
        } else {
          await supabase
            .from('profiles')
            .update({ firstLogin: false })
            .eq('user_id', user.id);

          notification.value = { message: 'Senha alterada com sucesso!', type: "success" };
          setTimeout(() => {
            router.push('/home');
          }, 2000);
        }
      } catch (error) {
        console.error('Error changing password:', error.message);
        notification.value = { message: 'Erro ao alterar senha. Tente novamente.', type: "error" };
      }
    };

    return {
      newPassword,
      confirmPassword,
      notification,
      handleChangePassword,
    };
  },
};
</script>

<style scoped>
.change-password-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f9;
}

.change-password-box {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: center;
}

.input-field {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.change-password-button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  background-color: #15803d;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.change-password-button:hover {
  background-color: #134e20;
}

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