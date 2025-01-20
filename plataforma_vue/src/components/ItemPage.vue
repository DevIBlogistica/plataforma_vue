<template>
    <main class="p-6">
      <h1 class="text-xl font-bold">{{ category }} - {{ item }}</h1>
      <p>Conteúdo dinâmico para {{ item }} na categoria {{ category }}</p>
    </main>
  </template>
  
  <script>
  export default {
    name: 'ItemPage',
    props: ['category', 'item'],
  };
  </script>
  