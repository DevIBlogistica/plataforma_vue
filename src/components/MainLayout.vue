<template>
    <div>
      <Navbar />
      <Sidebar />
      <div class="main-content">
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script>
  import Navbar from './Navbar.vue';
  import Sidebar from './Sidebar.vue';
  
  export default {
    components: {
      Navbar,
      Sidebar,
    },
  };
  </script>
  
  <style scoped>
  .main-content {
    margin-left: 250px; /* Ajuste conforme necessário */
    padding: 20px;
  }
  </style>