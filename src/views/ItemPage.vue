<template>
  <div class="home-layout">
    <Sidebar />
    <div class="main-content">
      <Navbar />
      <div class="content-container">           
        <div class="main-column">
          <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark flex-1">
            <div class="p-4">
              <div class="mb-6 flex flex-wrap gap-5 border-b border-stroke dark:border-strokedark sm:gap-10">
                <a aria-current="page" href="/ui-elements/tabs" class="router-link-active router-link-exact-active border-transparent border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base">Profile</a>
                <a aria-current="page" href="/ui-elements/tabs" class="router-link-active router-link-exact-active border-transparent border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base">Password</a>
                <a aria-current="page" href="/ui-elements/tabs" class="router-link-active router-link-exact-active border-transparent border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base">Team</a>
                <a aria-current="page" href="/ui-elements/tabs" class="router-link-active router-link-exact-active text-primary border-primary border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base">Notification</a>
              </div>                  
                <div class="embed-container">
                  <iframe class="embed-content" src="https://www.accuweather.com/pt/br/orindi%C3%BAva/36746/weather-radar/36746" allowfullscreen></iframe>
                </div>
                </div>
                </div>
              </div>
           
         
   
      </div>
      <Ticker />
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import Navbar from '@/components/Navbar.vue';
import Ticker from '@/components/Ticker.vue';

export default {
  name: 'ItemPage',
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
