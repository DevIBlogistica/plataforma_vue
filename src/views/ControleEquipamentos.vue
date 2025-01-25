<template>
    <div class="layout">
      <Sidebar />
      <div class="main-content">
        <Navbar />
        <div class="content-container">
          <div class="form-container">
            <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div class="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 class="font-medium text-black dark:text-white text-center">Registro de retirada</h3>
              </div>
              <form @submit.prevent="handleSubmit">
                <div class="p-6.5">
                  <div class="mb-5">
                    <input v-model="codigo_patrimonio" type="text" placeholder="Código Patrimônio" class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" :disabled="isEditing" required pattern="\d{1,6}" title="Somente números, até 6 dígitos" />
                  </div>
                  <div class="mb-5">
                    <input v-model="retirado_por" type="text" placeholder="Retirado por" class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" :disabled="isEditing" required />
                  </div>
                  <div class="mb-5">
                    <label for="data_retirada" class="block text-sm font-medium text-black dark:text-white">Data de Retirada</label>
                    <input v-model="data_retirada" type="date" id="data_retirada" class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" :disabled="isEditing" required />
                  </div>
                  <div class="mb-5">
                    <input v-model="frota_instalada" type="text" placeholder="Frota Instalada" class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" :disabled="isEditing" required pattern="\d{1,6}" title="Somente números, até 6 dígitos" />
                  </div>
                  <div class="mb-5">
                    <input v-model="entregue_por" type="text" placeholder="Entregue por" class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" :disabled="isEditing" required />
                  </div>
                  <div v-if="isEditing" class="mb-5">
                    <label for="data_devolucao" class="block text-sm font-medium text-black dark:text-white">Data de Devolução</label>
                    <input v-model="data_devolucao" type="date" id="data_devolucao" class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" required />
                  </div>
                  <div v-if="isEditing" class="mb-5">
                    <input v-model="devolvido_por" type="text" placeholder="Devolvido por" class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" required />
                  </div>
                  <div v-if="isEditing" class="mb-5">
                    <input v-model="recebido_por" type="text" placeholder="Recebido por" class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" required />
                  </div>
                  <div class="mb-5">
                    <textarea v-model="observacoes" placeholder="Observações" class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"></textarea>
                  </div>
                  <button type="submit" class="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                    {{ editingEquipmentId ? 'Atualizar' : 'Cadastrar' }}
                  </button>
                  <button v-if="editingEquipmentId" @click="cancelEdit" type="button" class="flex w-full justify-center rounded bg-secondary p-3 font-medium text-gray hover:bg-opacity-90 mt-2 cancel-button">
                    Cancelar
                  </button>
                  <p v-if="notification.message" :class="['notification', notification.type]">{{ notification.message }}</p>
                </div>
              </form>
            </div>
          </div>
          <div class="table-wrapper">
            <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div class="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex items-center justify-between">
                <h3 class="font-medium text-black dark:text-white text-center flex-grow">Equipamentos retirados</h3>
                <input 
                  v-model="searchQuery" 
                  placeholder="Pesquisar equipamentos..." 
                  class="border rounded px-2 py-1 w-64 text-sm"
                />
              </div>
              <div class="p-1">
                <div class="table-container">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código Patrimônio</th>
                        <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Retirado por</th>
                        <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data de Retirada</th>
                        <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frota Instalada</th>
                        <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entregue por</th>
                        <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Observações</th>
                        <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr v-for="equipment in filteredAndSortedEquipments" :key="equipment.id">
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ equipment.codigo_patrimonio }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ equipment.retirado_por }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ formatDate(equipment.data_retirada) }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ equipment.frota_instalada }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ equipment.entregue_por }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ equipment.observacoes }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ equipment.devolvido ? 'Devolvido' : 'Em campo' }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 relative">
                          <div class="relative">
                            <button 
                              @click="toggleActionMenu(equipment)" 
                              class="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-black shadow-11 hover:text-primary dark:bg-meta-4 dark:text-white dark:shadow-none">
                              Ações 
                              <svg class="fill-current" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.00039 11.4C7.85039 11.4 7.72539 11.35 7.60039 11.25L1.85039 5.60005C1.62539 5.37505 1.62539 5.02505 1.85039 4.80005C2.07539 4.57505 2.42539 4.57505 2.65039 4.80005L8.00039 10.025L13.3504 4.75005C13.5754 4.52505 13.9254 4.52505 14.1504 4.75005C14.3754 4.97505 14.3754 5.32505 14.1504 5.55005L8.40039 11.2C8.27539 11.325 8.15039 11.4 8.00039 11.4Z" fill=""></path>
                              </svg>
                            </button>
                            <div 
                              v-if="equipment.showActions" 
                              class="absolute right-0 z-10 w-full max-w-39.5 rounded-[5px] bg-white py-2.5 shadow-12 dark:bg-boxdark top-full mt-1">
                              <button 
                                @click="editEquipment(equipment)" 
                                class="flex w-full px-4 py-2 text-sm hover:bg-whiter hover:text-primary dark:hover:bg-meta-4">
                                Devolução
                              </button>
                              <button 
                                @click="deleteEquipment(equipment)" 
                                class="flex w-full px-4 py-2 text-sm hover:bg-whiter hover:text-primary dark:hover:bg-meta-4">
                                Excluir
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="ticker-wrapper">
          <Ticker />
        </div>
      </div>
    </div>
  </template>

<script>
import { ref, onMounted, computed } from 'vue';
import supabase from '@/utils/supabase';
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';
import Ticker from '@/components/Ticker.vue';

export default {
  name: 'ControleEquipamentos',
  components: {
    Navbar,
    Sidebar,
    Ticker,
  },
  setup() {
    const codigo_patrimonio = ref('');
    const retirado_por = ref('');
    const data_retirada = ref('');
    const frota_instalada = ref('');
    const entregue_por = ref('');
    const data_devolucao = ref('');
    const devolvido_por = ref('');
    const recebido_por = ref('');
    const observacoes = ref('');
    const notification = ref({ message: "", type: "" });
    const equipments = ref([]);
    const searchQuery = ref('');
    const editingEquipmentId = ref(null);

    const isEditing = computed(() => editingEquipmentId.value !== null);

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    };

    const fetchEquipments = async () => {
      const { data, error } = await supabase
        .from('controle_saidas')
        .select('*');
      if (error) {
        console.error('Erro ao buscar equipamentos:', error.message);
      } else {
        equipments.value = data.map(equipment => ({
          ...equipment,
          showActions: false
        }));
      }
    };

    const handleSubmit = async () => {
      if (editingEquipmentId.value) {
        // Atualizar equipamento existente
        const { error } = await supabase
          .from('controle_saidas')
          .update({
            codigo_patrimonio: codigo_patrimonio.value,
            retirado_por: retirado_por.value,
            data_retirada: data_retirada.value,
            frota_instalada: frota_instalada.value,
            entregue_por: entregue_por.value,
            data_devolucao: data_devolucao.value,
            devolvido_por: devolvido_por.value,
            recebido_por: recebido_por.value,
            observacoes: observacoes.value,
            devolvido: true,
          })
          .eq('id', editingEquipmentId.value);

        if (error) {
          notification.value = { message: `Erro ao atualizar equipamento: ${error.message}`, type: 'error' };
          setTimeout(() => {
            notification.value = { message: "", type: "" };
          }, 3000);
          return;
        }

        notification.value = { message: 'Equipamento atualizado com sucesso!', type: 'success' };
        editingEquipmentId.value = null;
      } else {
        // Criar novo equipamento
        const { error } = await supabase
          .from('controle_saidas')
          .insert({
            codigo_patrimonio: codigo_patrimonio.value,
            retirado_por: retirado_por.value,
            data_retirada: data_retirada.value,
            frota_instalada: frota_instalada.value,
            entregue_por: entregue_por.value,
            observacoes: observacoes.value,
            devolvido: false,
          });

        if (error) {
          notification.value = { message: `Erro ao criar equipamento: ${error.message}`, type: 'error' };
          setTimeout(() => {
            notification.value = { message: "", type: "" };
          }, 3000);
          return;
        }

        notification.value = { message: 'Equipamento criado com sucesso!', type: 'success' };
      }

      setTimeout(() => {
        notification.value = { message: "", type: "" };
      }, 3000);

      codigo_patrimonio.value = '';
      retirado_por.value = '';
      data_retirada.value = '';
      frota_instalada.value = '';
      entregue_por.value = '';
      data_devolucao.value = '';
      devolvido_por.value = '';
      recebido_por.value = '';
      observacoes.value = '';

      fetchEquipments();
    };

    const toggleActionMenu = (equipment) => {
      equipments.value.forEach(e => {
        if (e.id !== equipment.id) e.showActions = false;
      });
      equipment.showActions = !equipment.showActions;
    };

    const editEquipment = (equipment) => {
      codigo_patrimonio.value = equipment.codigo_patrimonio;
      retirado_por.value = equipment.retirado_por;
      data_retirada.value = equipment.data_retirada;
      frota_instalada.value = equipment.frota_instalada;
      entregue_por.value = equipment.entregue_por;
      data_devolucao.value = equipment.data_devolucao;
      devolvido_por.value = equipment.devolvido_por;
      recebido_por.value = equipment.recebido_por;
      observacoes.value = equipment.observacoes;
      editingEquipmentId.value = equipment.id;
    };

    const cancelEdit = () => {
      editingEquipmentId.value = null;
      codigo_patrimonio.value = '';
      retirado_por.value = '';
      data_retirada.value = '';
      frota_instalada.value = '';
      entregue_por.value = '';
      data_devolucao.value = '';
      devolvido_por.value = '';
      recebido_por.value = '';
      observacoes.value = '';
    };

    const deleteEquipment = async (equipment) => {
      const confirmDelete = confirm(`Tem certeza que deseja excluir o equipamento ${equipment.codigo_patrimonio}?`);
      
      if (confirmDelete) {
        try {
          const { error } = await supabase
            .from('controle_saidas')
            .delete()
            .eq('id', equipment.id);
          
          if (error) throw error;

          await fetchEquipments();

          notification.value = { 
            message: 'Equipamento excluído com sucesso!', 
            type: 'success' 
          };
        } catch (error) {
          notification.value = { 
            message: `Erro ao excluir equipamento: ${error.message}`, 
            type: 'error' 
          };
        }

        setTimeout(() => {
          notification.value = { message: "", type: "" };
        }, 3000);
      }
    };

    onMounted(fetchEquipments);

    const filteredAndSortedEquipments = computed(() => {
      let result = [...equipments.value];
      
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        result = result.filter(equipment => 
          equipment.codigo_patrimonio.toLowerCase().includes(query) ||
          equipment.retirado_por.toLowerCase().includes(query) ||
          equipment.data_retirada.toLowerCase().includes(query) ||
          equipment.frota_instalada.toLowerCase().includes(query) ||
          equipment.entregue_por.toLowerCase().includes(query) ||
          equipment.observacoes.toLowerCase().includes(query) ||
          (equipment.devolvido ? 'Devolvido' : 'Em campo').toLowerCase().includes(query)
        );
      }

      return result;
    });

    return {
      codigo_patrimonio,
      retirado_por,
      data_retirada,
      frota_instalada,
      entregue_por,
      data_devolucao,
      devolvido_por,
      recebido_por,
      observacoes,
      notification,
      equipments,
      searchQuery,
      editingEquipmentId,
      handleSubmit,
      formatDate,
      fetchEquipments,
      toggleActionMenu,
      editEquipment,
      cancelEdit,
      deleteEquipment,
      filteredAndSortedEquipments,
      isEditing,
    };
  },
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
  padding: 10px;
  display: flex;
  justify-content: space-between;
}

.form-container {
  width: 30%;
  margin: 0 auto;
}

.table-wrapper {
  width: 70%;
  margin-left: 10px;
}

.table-container {
  margin-top: 20px;
}

.ticker-wrapper {
  padding: 10px;
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

.cancel-button {
  background-color: rgb(239, 127, 26);
  color: white;
}

.cancel-button:hover {
  background-color: rgba(239, 127, 26, 0.9);
}

input[type="text"][pattern] {
  -moz-appearance: textfield;
}

input[type="text"][pattern]::-webkit-outer-spin-button,
input[type="text"][pattern]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>