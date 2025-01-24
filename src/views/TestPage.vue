<template>
  <div class="test-layout">
    <div class="main-content">
      <div class="content-container">
        <div class="main-column">
          <div class="embed-container">
            <iframe src="https://www.meteoblue.com/pt/tempo/mapas/widget?windAnimation=1&gust=1&satellite=1&cloudsAndPrecipitation=1&temperature=1&sunshine=1&extremeForecastIndex=1&geoloc=detect&tempunit=C&windunit=km%252Fh&lengthunit=metric&zoom=7&autowidth=auto" frameborder="0" scrolling="NO" allowtransparency="true" sandbox="allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox" style="width: 100%; height: 100%"></iframe>
          </div>
        </div>
        <Ticker :items="dieselPrices" />
      </div>
    </div>
  </div>
</template>

<script>
import Ticker from '@/components/Ticker.vue';
import { fetchDieselPrices } from '@/services/dataService';

export default {
  name: 'TestPage',
  components: {
    Ticker,
  },
  data() {
    return {
      dieselPrices: [],
    };
  },
  async created() {
    this.dieselPrices = await fetchDieselPrices();
  },
};
</script>

<style scoped>
.test-layout {
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
</style>