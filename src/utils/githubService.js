import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';
const REPO_OWNER = 'seu-usuario'; // Substitua pelo nome do proprietário do repositório
const REPO_NAME = 'seu-repositorio'; // Substitua pelo nome do repositório

export const getCommits = async () => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/repos/${REPO_OWNER}/${REPO_NAME}/commits`);
    return response.data;
  } catch (error) {
    console.error('Error fetching commits:', error);
    return [];
  }
};