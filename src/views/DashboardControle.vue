<template>
    <div class="layout">
      <Sidebar />
      <div class="main-content">
        <Navbar />
        <div class="content-container">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <!-- Card Usuários -->
            <div @click="$router.push('/controle-usuarios')" 
                 class="card hover:shadow-lg cursor-pointer">
              <div class="p-6 text-center">
                <h3 class="text-xl font-semibold text-black mb-4">Controle de Usuários</h3>
                <p class="text-gray-600">Gerenciamento de usuários e permissões</p>
              </div>
            </div>
            <!-- Card Equipamentos -->
            <div @click="$router.push('/controle-equipamentos')" 
                 class="card hover:shadow-lg cursor-pointer">
              <div class="p-6 text-center">
                <h3 class="text-xl font-semibold text-black mb-4">Controle de Equipamentos</h3>
                <p class="text-gray-600">Gerenciamento de retiradas e devoluções</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Navbar from '@/components/Navbar.vue';
  import Sidebar from '@/components/Sidebar.vue';
  
  export default {
    name: 'DashboardControle',
    components: {
      Navbar,
      Sidebar
    }
  }
  </script>
  
  <style scoped>
  .layout {
    display: flex;
    height: 100vh;
    background-color: #f4f4f9;
  }
  
  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;

  }
  
  .content-container {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
  }
  
  .card {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    transition: all 0.3s ease;
    padding: 20px;
    height: 200px; /* Altura fixa para os cards */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .card:hover {
    transform: translateY(-2px);
    border-color: #15803d;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .grid {
    max-width: 1200px;
    margin: 0 auto;
  }
  </style>