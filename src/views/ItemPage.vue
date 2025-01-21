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
        <Ticker />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import Navbar from '@/components/Navbar.vue';
import Ticker from '@/components/Ticker.vue';

export default {
  name: 'HomePage',
  components: {
    Sidebar,
    Navbar,
    Ticker,
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
  padding: 10px;
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
  border-radius: 5px;
}

</style>