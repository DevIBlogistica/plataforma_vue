<template>
    <div class="tabs-container">
      <div class="tabs">
        <button
          v-for="(tab, index) in tabs"
          :key="index"
          :class="{ active: activeTab === index }"
          @click="activeTab = index"
        >
          {{ tab.name }}
        </button>
      </div>
      <div class="tab-content">
        <iframe
          v-for="(tab, index) in tabs"
          :key="index"
          v-show="activeTab === index"
          :src="tab.url"
          frameborder="0"
          class="iframe-content"
        ></iframe>
      </div>
    </div>
  </template>
  
  <script>
  import { categories } from '@/utils/categories';
  
  export default {
    name: 'Tabs',
    props: {
      category: {
        type: String,
        required: true,
      },
      item: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        activeTab: 0,
        tabs: categories[this.category][this.item] || [],
      };
    },
  };
  </script>
  
  <style scoped>
  .tabs-container {
    display: flex;
    flex-direction: column;
  }
  
  .tabs {
    display: flex;
    justify-content: space-around;
    margin-bottom: 1rem;
  }
  
  .tabs button {
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
  
  .tabs button.active {
    background-color: #357430;
    color: white;
  }
  
  .tab-content {
    flex: 1;
  }
  
  .iframe-content {
    width: 100%;
    height: 80vh;
  }
  </style>