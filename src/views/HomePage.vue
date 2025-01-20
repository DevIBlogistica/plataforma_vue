<template>
  <div class="home-layout">
    <Sidebar />
    <div class="main-content">
      <Navbar />
      <div class="content-container">
        <!-- Coluna principal -->
        <div class="main-column">
          <div class="embed-container">
            <iframe class="embed-content" src="https://www.accuweather.com/pt/br/orindi%C3%BAva/36746/weather-radar/36746" allowfullscreen></iframe>
          </div>
        </div>
        <!-- Informações adicionais -->
        <div class="ticker-container">
          <div class="ticker">
            <div class="ticker-item">Preço médio do diesel: R$ 5,00</div>
            <div class="ticker-item">Outra informação interessante</div>
            <div class="ticker-item">Mais uma informação</div>
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
  name: 'HomePage',
  components: {
    Sidebar,
    Navbar,
  },
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
  padding: 20px;
}

.main-column {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.embed-container {
  width: 100%;
  height: 100%;
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