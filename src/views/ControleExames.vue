<template>
  <div class="layout">
    <Sidebar />
    <div class="main-content">
      <Navbar />
      <div class="content-container">
        <div class="header">
          <div class="header-content">
            <div class="header-buttons">
              <button @click="openAgendarModal" class="btn-text">Agendar Exame</button>
              <!-- Adicione outros botões aqui, se necessário -->
            </div>
          </div>
        </div>
        <table class="exames-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Função</th>
              <th>Setor</th>
              <th>Unidade de Negócio</th>
              <th>Natureza do Exame</th>
              <th>Data do Exame</th>
              <th>Custo do Agendamento</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="exame in exames" :key="exame.id">
              <td>{{ exame.nome }}</td>
              <td>{{ exame.funcao }}</td>
              <td>{{ exame.setor }}</td>
              <td>{{ exame.unidade_negocio }}</td>
              <td>{{ exame.natureza_exame }}</td>
              <td>{{ formatDate(exame.data_exame) }}</td>
              <td>{{ formatCurrency(exame.custo_total) }}</td>
              <td>
                <button @click="openVisualizarModal(exame)" class="btn-secondary">Visualizar</button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Modal para Agendar Exame -->
        <div v-if="showAgendarModal" class="modal">
          <div class="modal-content">
            <span class="close" @click="closeAgendarModal">&times;</span>
            <h2>Agendar Exame</h2>
            <form @submit.prevent="agendarExame" class="form-vertical">
              <div class="form-row">
                <div class="form-group">
                  <label for="nome">Nome</label>
                  <input v-model="novoExame.nome" type="text" id="nome" required />
                </div>
                <div class="form-group">
                  <label for="funcao">Função</label>
                  <select v-model="novoExame.funcao" id="funcao" @change="fetchExamesNecessarios" required>
                    <option v-for="funcao in funcoes" :key="funcao" :value="funcao">{{ funcao }}</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="naturezaExame">Natureza do Exame</label>
                  <select v-model="novoExame.naturezaExame" id="naturezaExame" @change="fetchExamesNecessarios" required>
                    <option v-for="natureza in naturezasExame" :key="natureza" :value="natureza">{{ natureza }}</option>
                  </select>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="setor">Setor</label>
                  <select v-model="novoExame.setor" id="setor" required>
                    <option v-for="setor in setores" :key="setor" :value="setor">{{ setor }}</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="unidadeNegocio">Unidade de Negócio</label>
                  <select v-model="novoExame.unidadeNegocio" id="unidadeNegocio" required>
                    <option v-for="unidade in unidadesNegocio" :key="unidade" :value="unidade">{{ unidade }}</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="dataExame">Data do Exame</label>
                  <input v-model="novoExame.dataExame" type="date" id="dataExame" required />
                </div>
              </div>
              <div class="form-group flex-grow">
                <label for="examesComplementares">Exames Complementares</label>
                <textarea v-model="examesComplementares" id="examesComplementares" disabled></textarea>
              </div>
              <button type="submit" class="btn-primary">Agendar</button>
              <p v-if="notification.message" :class="['notification', notification.type]">{{ notification.message }}</p>
            </form>
          </div>
        </div>

        <!-- Modal para Visualizar Exame -->
        <div v-if="showVisualizarModal" class="modal">
          <div class="modal-content">
            <span class="close" @click="closeVisualizarModal">&times;</span>
            <h2>Detalhes do Exame</h2>
            <p><strong>Nome:</strong> {{ exameSelecionado.nome }}</p>
            <p><strong>Função:</strong> {{ exameSelecionado.funcao }}</p>
            <p><strong>Setor:</strong> {{ exameSelecionado.setor }}</p>
            <p><strong>Unidade de Negócio:</strong> {{ exameSelecionado.unidade_negocio }}</p>
            <p><strong>Natureza do Exame:</strong> {{ exameSelecionado.natureza_exame }}</p>
            <p><strong>Data do Exame:</strong> {{ formatDate(exameSelecionado.data_exame) }}</p>
            <h3>Exames Necessários</h3>
            <ul>
              <li v-for="exame in exameSelecionado.examesDetalhados" :key="exame.exame">
                {{ exame.exame }} - {{ formatCurrency(exame.valor) }}
              </li>
            </ul>
            <p><strong>Custo Total do Agendamento:</strong> {{ formatCurrency(exameSelecionado.custo_total) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import supabase from '@/utils/supabase';
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';

export default {
  name: 'ControleExames',
  components: {
    Navbar,
    Sidebar,
  },
  setup() {
    const exames = ref([]);
    const funcoes = ref([]);
    const setores = ref([]);
    const unidadesNegocio = ref([]);
    const naturezasExame = ref([]);
    const examesComplementares = ref('');
    const showAgendarModal = ref(false);
    const showVisualizarModal = ref(false);
    const notification = ref({ message: '', type: '' });
    const novoExame = ref({
      nome: '',
      funcao: '',
      setor: '',
      unidadeNegocio: '',
      naturezaExame: '',
      dataExame: ''
    });
    const exameSelecionado = ref({});

    const fetchExames = async () => {
      const { data, error } = await supabase.from('dp_exames_agendados').select('*');
      if (error) console.error('Erro ao buscar exames:', error.message);
      else {
        for (const exame of data) {
          const { data: examesDetalhados, error: errorDetalhes } = await supabase
            .from('dp_exames')
            .select('exame, valor')
            .in('exame', exame.exames_complementares.split('\n'));

          if (errorDetalhes) {
            console.error('Erro ao buscar detalhes dos exames:', errorDetalhes.message);
          } else {
            console.log('Exames detalhados:', examesDetalhados);
            exame.examesDetalhados = examesDetalhados;
            exame.custo_total = examesDetalhados.reduce((total, item) => {
              console.log('Somando valor:', item.valor);
              return total + item.valor;
            }, 0);
            console.log('Custo total:', exame.custo_total);
          }
        }
        exames.value = data;
      }
    };

    const fetchDropdownData = async () => {
      try {
        const { data: funcoesData } = await supabase.from('dp_funcoes').select('*');
        if (funcoesData) funcoes.value = funcoesData.map(item => item.nome);

        const { data: setoresData } = await supabase.from('dp_setores').select('*');
        if (setoresData) setores.value = setoresData.map(item => item.nome);

        const { data: unidadesNegocioData } = await supabase.from('dp_unidades_negocio').select('*');
        if (unidadesNegocioData) unidadesNegocio.value = unidadesNegocioData.map(item => item.nome);

        const { data: naturezasExameData } = await supabase.from('dp_natureza_exame').select('*');
        if (naturezasExameData) naturezasExame.value = naturezasExameData.map(item => item.nome);
      } catch (error) {
        console.error('Erro ao buscar dados dos dropdowns:', error.message);
      }
    };

    const fetchExamesNecessarios = async () => {
      if (!novoExame.value.funcao || !novoExame.value.naturezaExame) return;

      try {
        const { data, error } = await supabase
          .from('dp_exames_necessarios')
          .select('exame')
          .ilike('funcao', novoExame.value.funcao)
          .ilike('natureza_exame', novoExame.value.naturezaExame);

        if (error) {
          console.error('Erro ao buscar exames necessários:', error.message);
        } else {
          examesComplementares.value = data.map(item => item.exame).join('\n');
        }
      } catch (error) {
        console.error('Erro ao buscar exames necessários:', error.message);
      }
    };

    const openAgendarModal = () => {
      showAgendarModal.value = true;
    };

    const closeAgendarModal = () => {
      showAgendarModal.value = false;
      clearNotification();
    };

    const openVisualizarModal = (exame) => {
      exameSelecionado.value = exame;
      showVisualizarModal.value = true;
    };

    const closeVisualizarModal = () => {
      showVisualizarModal.value = false;
    };

    const clearForm = () => {
      novoExame.value = {
        nome: '',
        funcao: '',
        setor: '',
        unidadeNegocio: '',
        naturezaExame: '',
        dataExame: ''
      };
      examesComplementares.value = '';
    };

    const clearNotification = () => {
      notification.value = { message: '', type: '' };
    };

    const agendarExame = async () => {
      const { error } = await supabase.from('dp_exames_agendados').insert([{
        nome: novoExame.value.nome,
        funcao: novoExame.value.funcao,
        setor: novoExame.value.setor,
        unidade_negocio: novoExame.value.unidadeNegocio,
        natureza_exame: novoExame.value.naturezaExame,
        data_exame: novoExame.value.dataExame,
        exames_complementares: examesComplementares.value
      }]);
      if (error) {
        console.error('Erro ao agendar exame:', error.message);
        notification.value = { message: `Erro ao agendar exame: ${error.message}`, type: 'error' };
      } else {
        fetchExames();
        clearForm();
        notification.value = { message: 'Exame agendado com sucesso!', type: 'success' };
      }
    };

    const formatDate = (date) => {
      if (!date) return '';
      const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
      return new Date(date).toLocaleDateString('pt-BR', options);
    };

    const formatCurrency = (value) => {
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    };

    onMounted(() => {
      fetchExames();
      fetchDropdownData();
    });

    return {
      exames,
      funcoes,
      setores,
      unidadesNegocio,
      naturezasExame,
      examesComplementares,
      showAgendarModal,
      showVisualizarModal,
      notification,
      novoExame,
      exameSelecionado,
      openAgendarModal,
      closeAgendarModal,
      openVisualizarModal,
      closeVisualizarModal,
      agendarExame,
      fetchExamesNecessarios,
      formatDate,
      formatCurrency
    };
  }
};
</script>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.content-container {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.exames-table {
  width: 100%;
  border-collapse: collapse;
}

.exames-table th, .exames-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.exames-table th {
  background-color: #f2f2f2;
  text-align: left;
}

.btn-primary {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

.btn-secondary {
  background-color: #008CBA;
  color: white;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
}

.btn-text {
  background: none;
  color: #007BFF;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: 16px;
  text-decoration: underline;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 800px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.form-vertical {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.form-row {
  display: flex;
  gap: 15px;
}

.form-group {
  flex: 1;
  margin-bottom: 15px;
}

.form-group label {
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px;
  box-sizing: border-box;
  font-size: 16px;
}

.form-group textarea {
  resize: none;
  flex-grow: 1;
}

.notification {
  margin-top: 10px;
  font-size: 14px;
  font-weight: bold;
}

.notification.error {
  color: #e63946;
}

.notification.success {
  color: #15803d;
}
</style>