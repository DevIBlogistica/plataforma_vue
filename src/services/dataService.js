import axios from 'axios';

export const fetchDieselPrices = async () => {
  try {
    // Fazendo a requisição HTTP usando CORS Anywhere
    const response = await axios.get('https://cors-anywhere.herokuapp.com/https://precos.petrobras.com.br/sele%C3%A7%C3%A3o-de-estados-diesel');
    console.log('Dados recebidos da requisição:', response.data);

    // Processando os dados recebidos
    const data = response.data;
    const prices = extractPricesFromData(data);
    console.log('Preços extraídos:', prices);

    return prices;
  } catch (error) {
    console.error('Erro ao buscar os preços do diesel:', error);
    return ['Erro ao buscar os preços do diesel'];
  }
};

const extractPricesFromData = (data) => {
  // Simulação de extração de dados
  console.log('Dados brutos para extração:', data);
  return ['Preço médio do diesel: R$ 4,50', 'Preço médio do diesel: R$ 4,60'];
};