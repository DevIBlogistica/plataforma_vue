<template>
  <div class="home-layout">
    <Sidebar />
    <div class="main-content">
      <Navbar />
      <div class="content-container full-screen">           
        <div class="main-column">
          <div class="rounded-sm border border-stroke bg-white shadow-default">
            <div class="px-4 py-2">
              <div class="tabs-container flex flex-wrap gap-5 border-b border-stroke sm:gap-10">
                <a
                  v-for="tab in tabs"
                  :key="tab.name"
                  href="#"
                  @click.prevent="selectTab(tab)"
                  :class="{'text-primary border-primary': selectedTab.name === tab.name, 'border-transparent': selectedTab.name !== tab.name}"
                  class="router-link-active router-link-exact-active border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base"
                >
                  {{ tab.name }}
                </a>
              </div>                  
            </div>
          </div>
          <div class="embed-container" v-html="selectedTab.content"></div>
        </div>
        <Ticker />
      </div>
     
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import Navbar from '@/components/Navbar.vue';
import Ticker from '@/components/Ticker.vue';
import { pagesConfig } from '@/utils/pages.Config';

export default {
  name: 'ItemPage',
  components: {
    Sidebar,
    Navbar,
    Ticker,
  },
  props: {
    category: String,
    item: String,
  },
  data() {
    return {
      tabs: [],
      selectedTab: {},
    };
  },
  watch: {
    '$route.params': {
      handler: 'updateTabs',
      immediate: true,
    },
  },
  methods: {
    updateTabs() {
      const { category, item } = this.$route.params;
      const categoryConfig = pagesConfig[category];
      if (categoryConfig) {
        const itemConfig = categoryConfig[item];
        if (itemConfig) {
          this.tabs = itemConfig.tabs || [];
          this.selectedTab = this.tabs[0] || {};
        }
      }
    },
    selectTab(tab) {
      this.selectedTab = tab;
    },
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
  flex-direction: column;
}

.embed-container {
  width: 100%;
  height: 100%;
}

.full-screen {
  width: 100%;
  height: 100%;
}
.embed-content {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
</style>