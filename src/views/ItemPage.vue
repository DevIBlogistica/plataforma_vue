<template>
  <div class="home-layout">
    <Sidebar />
    <div class="main-content">
      <Navbar />
      <div class="content-container">
        <!-- Coluna principal -->
        <div class="main-column">
          <div class="embed-container">
            <iframe
              class="embed-content"
              title="Dashboard de Monitoramento do Plantio"
              width="1920"
              height="1080"
              src="https://app.powerbi.com/view?r=eyJrIjoiYWYyMzdkZjYtMjBmMy00MmQ0LWEwZmQtMmNkNWI2NmI0MjkzIiwidCI6IjY1OWNlMmI4LTA3MTQtNDE5OC04YzM4LWRjOWI2MGFhYmI1NyJ9"
              frameborder="0"
              allowfullscreen="true"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'ItemPage',
  components: {
    Sidebar,
    Navbar,
  },
  props: ['category', 'item'],
};
</script>

<style scoped>
.home-layout {
  display: flex;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.content-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.main-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.embed-container {
  width: 100%;
  height: 100%;
  flex: 1;
}

.embed-content {
  width: 100%;
  height: 100%;
  border: none;
}

.ticker-container {
  width: 100%;
  overflow: hidden;
  background-color: #f4f4f9;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.ticker {
  display: flex;
  animation: ticker 30s linear infinite;
}

.ticker-item {
  flex: none;
  padding: 0 20px;
  white-space: nowrap;
}

@keyframes ticker {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>