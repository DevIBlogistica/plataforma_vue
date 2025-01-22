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
/* Adicione estilos para as notificações, se necessário */
.notification {
  margin-top: 10px;
}
.notification.error {
  color: red;
}
.notification.success {
  color: green;
}
</style>