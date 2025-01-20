<template>
  <div class="flex h-screen bg-gray-100 dark:bg-gray-900"> <!-- Contêiner principal com classes para layout flexível e temas claro/escuro -->
    <Sidebar /> <!-- Componente de barra lateral -->
    <div class="flex-1 flex flex-col"> <!-- Contêiner flexível que ocupa o restante da tela, organizado em coluna -->
      <Navbar userName="Thomas Anree" userRole="UX Designer" /> <!-- Componente de barra de navegação com propriedades de nome e função do usuário -->
      <main class="flex-1 p-6"> <!-- Área principal do conteúdo, com preenchimento interno -->
        <h1 class="text-xl font-bold">Bem-vindo à plataforma!</h1> <!-- Título principal da página -->
        <p>Selecione uma categoria no menu para começar.</p> <!-- Texto de instrução para o usuário -->
      </main>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue"; // Importa o componente Sidebar
import Navbar from "@/components/Navbar.vue"; // Importa o componente Navbar

export default {name: "HomePage", // Define o nome do componente
  components: { Sidebar, Navbar }, // Registra os componentes Sidebar e Navbar para uso neste componente
};
</script>
