<template>
    <div class="updates-container">
      <h2>Atualizações Recentes</h2>
      <ul>
        <li v-for="commit in commits" :key="commit.sha">
          <a :href="commit.url" target="_blank">{{ commit.summary }}</a>
          <p>{{ commit.author }} - {{ commit.date }}</p>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { getCommits } from '@/utils/githubService';
  import { summarizeCommits } from '@/utils/commitUtils';
  
  export default {
    name: 'Updates',
    setup() {
      const commits = ref([]);
  
      onMounted(async () => {
        const commitData = await getCommits();
        commits.value = summarizeCommits(commitData);
      });
  
      return {
        commits,
      };
    },
  };
  </script>
  
  <style scoped>
  .updates-container {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
  }
  
  .updates-container h2 {
    margin-bottom: 20px;
  }
  
  .updates-container ul {
    list-style-type: none;
    padding: 0;
  }
  
  .updates-container li {
    margin-bottom: 15px;
  }
  
  .updates-container a {
    font-weight: bold;
    color: #15803d;
    text-decoration: none;
  }
  
  .updates-container p {
    margin: 5px 0 0;
    color: #555;
  }
  </style>