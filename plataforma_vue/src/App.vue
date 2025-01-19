<template>
  <div id="app"> <!-- O elemento raiz da aplicação, com um ID para facilitar a estilização e manipulação -->
    <router-view /> <!-- Ponto de montagem das páginas, onde os componentes de rota serão renderizados -->
  </div>
</template>

<script>
export default {
  name: 'App', // Nome do componente, útil para depuração e ferramentas de desenvolvimento
};
</script>
