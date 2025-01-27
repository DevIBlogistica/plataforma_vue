<template>
  <div class="layout">
    <Sidebar />
    <div class="main-content">
      <Navbar />
     
      <!-- Conteúdo Principal-->
      <div class="content-container">
        <div class="form-container">
          <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div class="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 class="font-medium text-black dark:text-white text-center">Adicionar novo arquivo</h3>
            </div>
            <div class="flex flex-col gap-5.5 p-6.5">
              <div>
                <label class="mb-3 block text-sm font-medium text-black dark:text-white">Anexar arquivo</label>
                <input ref="fileInput" type="file" class="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary">
              </div>
              <div class="flex justify-end gap-2">
                <button @click="handleCancel" type="button" class="cancel-button flex justify-center rounded bg-secondary p-3 font-medium text-gray hover:bg-opacity-90 w-full">Cancelar</button>
                <button @click="handleSubmit" type="button" class="flex justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 w-full">Adicionar</button>
              </div>
              <div v-if="iframeCode" class="mt-4">
                <div class="flex justify-between items-center mb-3">
                  <label class="block text-sm font-medium text-black dark:text-white">Código do Iframe</label>
                  <button @click="copyIframeCode" class="bg-gray-200 p-1 rounded hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600">
                    Copiar
                  </button>
                </div>
                <div class="message-box">
                  <textarea readonly class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" style="height: auto; overflow: hidden; min-height: 180px;" v-model="iframeCode"></textarea>
                </div>
              </div>
              <div v-if="fileUrl" class="mt-4">
                <label class="mb-3 block text-sm font-medium text-black dark:text-white">URL do Arquivo</label>
                <input type="text" readonly :value="fileUrl" class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" disabled>
              </div>
            </div>
          </div>
        </div>

        <!-- Tabela de Gerenciamento de Arquivos -->
        <div class="table-wrapper flex-grow">
          <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark h-full flex flex-col">
            <div class="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex items-center justify-between">
              <h3 class="font-medium text-black dark:text-white text-center flex-grow">Arquivos Disponíveis</h3>
              <input v-model="searchQuery" placeholder="Pesquisar arquivos..." class="border rounded px-2 w-64 text-sm" />
            </div>
            <div class="p-1 h-full flex flex-col">
              <div class="table-container flex-grow">
                <table class="min-w-full divide-y divide-gray-200 h-full">
                  <thead>
                    <tr>
                      <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome do Arquivo</th>
                      <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tamanho</th>
                      <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                      <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data de Envio</th>
                      <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200 h-full align-top">
                    <tr v-for="file in paginatedFiles" :key="file.name" class="align-top">
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ file.name }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ formatSize(file.size) }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ file.type }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ formatDate(file.created_at) }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 relative">
                        <div class="relative">
                          <button @click="toggleActionMenu(file)" class="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-black shadow-11 hover:text-primary dark:bg-meta-4 dark:text-white dark:shadow-none">
                            Ações 
                            <svg class="fill-current" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M8.00039 11.4C7.85039 11.4 7.72539 11.35 7.60039 11.25L1.85039 5.60005C1.62539 5.37505 1.62539 5.02505 1.85039 4.80005C2.07539 4.57505 2.42539 4.57505 2.65039 4.80005L8.00039 10.025L13.3504 4.75005C13.5754 4.52505 13.9254 4.52505 14.1504 4.75005C14.3754 4.97505 14.3754 5.32505 14.1504 5.55005L8.40039 11.2C8.27539 11.325 8.15039 11.4 8.00039 11.4Z" fill=""></path>
                            </svg>
                          </button>
                          <div v-if="file.showActions" class="absolute right-0 z-10 w-full max-w-39.5 rounded-[5px] bg-white py-2.5 shadow-12 dark:bg-boxdark top-full mt-1">
                            <button @click="viewFile(file)" class="flex w-full px-4 py-2 text-sm hover:bg-whiter hover:text-primary dark:hover:bg-meta-4">
                              Visualizar
                            </button>
                            <button @click="deleteFile(file)" class="flex w-full px-4 py-2 text-sm hover:bg-whiter hover:text-primary dark:hover:bg-meta-4">
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
      <!-- Fim do Conteúdo Principal -->
       
      <div class="ticker-wrapper">
        <Ticker />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { createClient } from '@supabase/supabase-js';
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';
import Ticker from '@/components/Ticker.vue';

const supabaseUrl = 'https://kjlwqezxzqjfhacmjhbh.supabase.co';
const supabaseKey = 'your-public-anon-key'; // Replace with your public API key
const supabase = createClient(supabaseUrl, supabaseKey);

export default {
  name: 'ControleArquivos',
  components: {
    Navbar,
    Sidebar,
    Ticker,
  },
  setup() {
    const fileInput = ref(null);
    const iframeCode = ref('');
    const fileUrl = ref('');
    const files = ref([]);
    const searchQuery = ref('');
    const currentPage = ref(1);
    const itemsPerPage = 10;

    const sanitizeFileName = (fileName) => {
      return fileName
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove acentos
        .replace(/[^a-zA-Z0-9.-]/g, '_'); // Substitui caracteres especiais por _
    };

    const handleSubmit = async () => {
      const file = fileInput.value.files[0];
      if (!file) {
        alert('Nenhum arquivo selecionado.');
        return;
      }

      const sanitizedFileName = sanitizeFileName(file.name);

      const { data, error } = await supabase.storage
        .from('pdfs')
        .upload(sanitizedFileName, file);

      if (error) {
        alert(`Erro ao fazer upload do arquivo: ${error.message}`);
        return;
      }

      const publicUrl = `https://kjlwqezxzqjfhacmjhbh.supabase.co/storage/v1/object/public/pdfs/${sanitizedFileName}`;

      fileUrl.value = publicUrl;
      iframeCode.value = `<iframe src="${publicUrl}" width="600" height="400" frameborder="0" allowfullscreen></iframe>`;
      fetchFiles();
    };

    const handleCancel = () => {
      fileInput.value.value = '';
      iframeCode.value = '';
      fileUrl.value = '';
    };

    const copyIframeCode = () => {
      navigator.clipboard.writeText(iframeCode.value).then(() => {
        alert('Código do iframe copiado para a área de transferência.');
      });
    };

    const fetchFiles = async () => {
      const { data, error } = await supabase.storage.from('pdfs').list('', { limit: 100 });
      if (error) {
        console.error('Erro ao buscar arquivos:', error.message);
      } else {
        files.value = data.map(file => ({
          name: file.name,
          size: file.metadata.size,
          type: file.metadata.mimetype,
          created_at: file.created_at,
          url: `https://kjlwqezxzqjfhacmjhbh.supabase.co/storage/v1/object/public/pdfs/${file.name}`,
          showActions: false
        }));
      }
    };

    const toggleActionMenu = (file) => {
      files.value.forEach(f => {
        if (f.name !== file.name) f.showActions = false;
      });
      file.showActions = !file.showActions;
    };

    const viewFile = (file) => {
      window.open(file.url, '_blank');
    };

    const deleteFile = async (file) => {
      const confirmDelete = confirm(`Tem certeza que deseja excluir o arquivo ${file.name}?`);

      if (confirmDelete) {
        try {
          const { error } = await supabase.storage.from('pdfs').remove([file.name]);

          if (error) throw error;

          await fetchFiles();

          alert('Arquivo excluído com sucesso!');
        } catch (error) {
          alert(`Erro ao excluir arquivo: ${error.message}`);
        }
      }
    };

    const formatSize = (size) => {
      if (size < 1024) return `${size} B`;
      if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
      return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    };

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const filteredFiles = computed(() => {
      if (!searchQuery.value) return files.value;
      return files.value.filter(file =>
        file.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    const paginatedFiles = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return filteredFiles.value.slice(start, end);
    });

    const totalPages = computed(() => {
      return Math.ceil(filteredFiles.value.length / itemsPerPage);
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

    onMounted(() => {
      fetchFiles();
    });

    return {
      fileInput,
      iframeCode,
      fileUrl,
      files,
      searchQuery,
      currentPage,
      totalPages,
      handleSubmit,
      handleCancel,
      copyIframeCode,
      toggleActionMenu,
      viewFile,
      deleteFile,
      formatSize,
      formatDate,
      filteredFiles,
      paginatedFiles,
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

.ticker-wrapper {
  width: 100%;
  padding: 10px;
}

textarea {
  resize: none;
  overflow: hidden;
}

.message-box {
  border: 1.5px solid var(--border-stroke);
  border-radius: 0.375rem;
  padding: 0.75rem;
  background-color: var(--bg-transparent);
  min-height: 180px;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

tbody {
  vertical-align: top;
}

tr {
  vertical-align: top;
}
</style>