<template>
    <div class="layout">
      <Sidebar />
      <div class="main-content">
        <Navbar />
        <div class="content-container">
          <div class="form-container">
            <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div class="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 class="font-medium text-black dark:text-white text-center">Cadastro de Equipamento</h3>
              </div>
              <form @submit.prevent="handleSubmit">
                <div class="p-6.5">
                  <div class="mb-5">
                    <input v-model="codigo_patrimonio" type="text" placeholder="Código Patrimônio" class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" required />
                  </div>
                  <div class="mb-5">
                    <input v-model="num_serie" type="text" placeholder="Número de Série" class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" required />
                  </div>
                  <div class="mb-5">
                    <select v-model="descricao" @change="handleDescricaoChange" class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" required>
                      <option value="" disabled>Selecione a descrição</option>
                      <option value="Receptor JohnDeere Starfire 6000">Receptor JohnDeere Starfire 6000</option>
                      <option value="Rádio RTK JohnDeere">Rádio RTK JohnDeere</option>
                      <option value="Trimble NAV-900">Trimble NAV-900</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>
                  <div v-if="descricao === 'Outro'" class="mb-5">
                    <input v-model="descricaoOutro" type="text" placeholder="Descrição" class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" required />
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
            <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark h-full flex flex-col">
              <div class="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex items-center justify-between">
                <h3 class="font-medium text-black dark:text-white text-center flex-grow">Equipamentos Cadastrados</h3>
                <input v-model="searchQuery" placeholder="Pesquisar equipamentos..." class="border rounded px-2 w-64 text-sm" />
              </div>
              <div class="p-1 h-full flex flex-col overflow-x-auto custom-scrollbar">
                <div class="table-container flex-grow">
                  <table class="min-w-full divide-y divide-gray-200 h-full">
                    <thead>
                      <tr>
                        <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código Patrimônio</th>
                        <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Número de Série</th>
                        <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                        <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200 h-full align-top">
                      <tr v-for="equipment in paginatedEquipments" :key="equipment.id" class="align-top">
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ equipment.codigo_patrimonio }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ equipment.num_serie }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ equipment.descricao }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 relative">
                          <div class="relative">
                            <button @click="toggleActionMenu(equipment)" class="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-black shadow-11 hover:text-primary dark:bg-meta-4 dark:text-white dark:shadow-none">
                              Ações
                              <svg class="fill-current" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 9.33333C8.7364 9.33333 9.33333 8.7364 9.33333 8C9.33333 7.2636 8.7364 6.66667 8 6.66667C7.2636 6.66667 6.66667 7.2636 6.66667 8C6.66667 8.7364 7.2636 9.33333 8 9.33333Z" fill="currentColor"/>
                                <path d="M8 4.66667C8.7364 4.66667 9.33333 4.06973 9.33333 3.33333C9.33333 2.59693 8.7364 2 8 2C7.2636 2 6.66667 2.59693 6.66667 3.33333C6.66667 4.06973 7.2636 4.66667 8 4.66667Z" fill="currentColor"/>
                                <path d="M8 14C8.7364 14 9.33333 13.4031 9.33333 12.6667C9.33333 11.9303 8.7364 11.3333 8 11.3333C7.2636 11.3333 6.66667 11.9303 6.66667 12.6667C6.66667 13.4031 7.2636 14 8 14Z" fill="currentColor"/>
                              </svg>
                            </button>
                            <div v-if="equipment.showActions" class="absolute right-0 z-10 w-full max-w-39.5 rounded-[5px] bg-white py-2.5 shadow-12 dark:bg-boxdark top-full mt-1">
                              <button @click="editEquipment(equipment)" class="flex w-full px-4 py-2 text-sm hover:bg-whiter hover:text-primary dark:hover:bg-meta-4">
                                Editar
                              </button>
                              <button @click="deleteEquipment(equipment)" class="flex w-full px-4 py-2 text-sm hover:bg-whiter hover:text-primary dark:hover:bg-meta-4">
                                Excluir
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="pagination mt-4 flex justify-center">
                  <button @click="prevPage" :disabled="currentPage === 1" class="px-4 py-2 mx-1 bg-gray-200 rounded hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600">Anterior</button>
                  <span class="px-4 py-2 mx-1">{{ currentPage }} / {{ totalPages }}</span>
                  <button @click="nextPage" :disabled="currentPage === totalPages" class="px-4 py-2 mx-1 bg-gray-200 rounded hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600">Próxima</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
<script>
import { ref, onMounted, computed } from 'vue';
import supabase from '@/utils/supabase';
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';

export default {
  name: 'CadastroEquipamentos',
  components: {
    Navbar,
    Sidebar,
  },
  setup() {
    const codigo_patrimonio = ref('');
    const num_serie = ref('');
    const descricao = ref('');
    const descricaoOutro = ref('');
    const notification = ref({ message: "", type: "" });
    const equipments = ref([]);
    const searchQuery = ref('');
    const currentPage = ref(1);
    const itemsPerPage = 10;
    const editingEquipmentId = ref(null);

    const handleSubmit = async () => {
      try {
        const descricaoFinal = descricao.value === 'Outro' ? descricaoOutro.value : descricao.value;
        const { error } = await supabase
          .from('equipamentos')
          .insert({
            codigo_patrimonio: codigo_patrimonio.value,
            num_serie: num_serie.value,
            descricao: descricaoFinal,
          });

        if (error) throw error;

        notification.value = { message: 'Equipamento cadastrado com sucesso!', type: 'success' };
        codigo_patrimonio.value = '';
        num_serie.value = '';
        descricao.value = '';
        descricaoOutro.value = '';
        fetchEquipments();
      } catch (error) {
        notification.value = { message: `Erro ao cadastrar equipamento: ${error.message}`, type: 'error' };
      }

      setTimeout(() => {
        notification.value = { message: "", type: "" };
      }, 3000);
    };

    const fetchEquipments = async () => {
      const { data, error } = await supabase
        .from('equipamentos')
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

    const editEquipment = (equipment) => {
      codigo_patrimonio.value = equipment.codigo_patrimonio;
      num_serie.value = equipment.num_serie;
      descricao.value = equipment.descricao;
      descricaoOutro.value = equipment.descricao === 'Outro' ? equipment.descricao : '';
      editingEquipmentId.value = equipment.id;
    };

    const deleteEquipment = async (equipment) => {
      const confirmDelete = confirm(`Tem certeza que deseja excluir o equipamento ${equipment.codigo_patrimonio}?`);

      if (confirmDelete) {
        try {
          const { error } = await supabase
            .from('equipamentos')
            .delete()
            .eq('id', equipment.id);

          if (error) throw error;

          await fetchEquipments();

          notification.value = { message: 'Equipamento excluído com sucesso!', type: 'success' };
        } catch (error) {
          notification.value = { message: `Erro ao excluir equipamento: ${error.message}`, type: 'error' };
        }

        setTimeout(() => {
          notification.value = { message: "", type: "" };
        }, 3000);
      }
    };

    const toggleActionMenu = (equipment) => {
      equipments.value.forEach(e => {
        if (e.id !== equipment.id) e.showActions = false;
      });
      equipment.showActions = !equipment.showActions;
    };

    const handleDescricaoChange = () => {
      if (descricao.value !== 'Outro') {
        descricaoOutro.value = '';
      }
    };

    const cancelEdit = () => {
      editingEquipmentId.value = null;
      codigo_patrimonio.value = '';
      num_serie.value = '';
      descricao.value = '';
      descricaoOutro.value = '';
    };

    const filteredEquipments = computed(() => {
      if (!searchQuery.value) return equipments.value;
      return equipments.value.filter(equipment =>
        equipment.codigo_patrimonio.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        equipment.descricao.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    const paginatedEquipments = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return filteredEquipments.value.slice(start, end);
    });

    const totalPages = computed(() => {
      return Math.ceil(filteredEquipments.value.length / itemsPerPage);
    });

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    onMounted(fetchEquipments);

    return {
      codigo_patrimonio,
      num_serie,
      descricao,
      descricaoOutro,
      notification,
      equipments,
      searchQuery,
      currentPage,
      totalPages,
      handleSubmit,
      editEquipment,
      deleteEquipment,
      toggleActionMenu,
      handleDescricaoChange,
      cancelEdit,
      paginatedEquipments,
      prevPage,
      nextPage,
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
  width: 40%;
}

.table-wrapper {
  width: 60%;
  margin-left: 10px;
  height: 100%;
}

.custom-scrollbar::-webkit-scrollbar {
  height: 4px; /* Altura mínima da barra de rolagem horizontal */
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #15803ca4; /* Cor da barra de rolagem */
  border-radius: 10px; /* Bordas arredondadas */
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: #15803d; /* Cor da barra de rolagem ao passar o mouse */
}

.notification {
  margin-top: 10px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
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
</style>