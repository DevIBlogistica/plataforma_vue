<template>
  <div class="item-page-layout">
    <Sidebar />
    <div class="main-content">
      <Navbar />
      <div class="content-container">
        <h1 class="text-xl font-bold">{{ category }} - {{ item }}</h1>
        <Tabs :category="category" :item="item" />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import Navbar from '@/components/Navbar.vue';
import Tabs from '@/components/Tabs.vue';

export default {
  name: 'ItemPage',
  components: {
    Sidebar,
    Navbar,
    Tabs,
  },
  props: ['category', 'item'],
};
</script>

<style scoped>
.item-page-layout {
  display: flex;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.content-container {
  flex: 1;
  padding: 1rem;
}
</style>