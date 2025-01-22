<template>
    <div class="ticker-container">
      <div class="ticker">
        <div class="ticker-item" v-for="(item, index) in items" :key="index">
          {{ item }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Ticker',
    props: {
      items: {
        type: Array,
        required: true,
        default: () => ['Lorem ipsum dolor sit amet', 'Consectetur adipiscing elit', 'Sed do eiusmod tempor incididunt'],
      },
    },
  };
  </script>
  
  <style scoped>
  .ticker-container {
    width: 100%;
    overflow: hidden;
    background-color: white;
    border-radius: 5px;
    padding: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-top: 10px;
  }
  
  .ticker {
    display: flex;
    animation: ticker 30s linear infinite;
  }
  
  .ticker-item {
    flex: none;
    padding: 0 10px;
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