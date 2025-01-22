<template>
  <div class="home-layout">
    <Sidebar />
    <div class="main-content">
      <Navbar />
      <div class="content-container">
        <!-- Coluna principal -->
        <div class="main-column">
          <div class="embed-container">
            <iframe src="https://www.meteoblue.com/pt/tempo/mapas/widget?windAnimation=1&gust=1&satellite=1&cloudsAndPrecipitation=1&temperature=1&sunshine=1&extremeForecastIndex=1&geoloc=detect&tempunit=C&windunit=km%252Fh&lengthunit=metric&zoom=7&autowidth=auto"  frameborder="0" scrolling="NO" allowtransparency="true" sandbox="allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox" style="width: 100%; height: 720px"></iframe>
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