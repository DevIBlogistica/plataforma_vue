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
                <textarea readonly class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" style="height: auto; overflow: hidden;">{{ iframeCode }}</textarea>
              </div>
              <div v-if="fileUrl" class="mt-4">
                <label class="mb-3 block text-sm font-medium text-black dark:text-white">URL do Arquivo</label>
                <input type="text" readonly :value="fileUrl" class="w-full rounded-lg border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary" disabled>
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
import { ref } from 'vue';
import supabase from '@/utils/supabase';
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';
import Ticker from '@/components/Ticker.vue';

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

    return {
      fileInput,
      iframeCode,
      fileUrl,
      handleSubmit,
      handleCancel,
      copyIframeCode,
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
  justify-content: center;
  align-items: center;
}

.form-container {
  width: 50%;
}

.ticker-wrapper {
  width: 100%;
  padding: 10px;
}
textarea {
  resize: none;
  overflow: hidden;
  height: auto;
}
.cancel-button {
  background-color: rgb(239, 127, 26);
  color: white;
}

.cancel-button:hover {
  background-color: rgba(239, 127, 26, 0.9);
}
</style>
