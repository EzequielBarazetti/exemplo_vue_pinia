<script setup>
import { ref, computed, onMounted } from "vue" 
import { useTabelasStore } from "./stores/tabelas"
import Tabela1 from "./components/TableComponent.vue"
import Tabela2 from "./components/TableComponent2.vue"
import TableComponent4 from "./components/TableComponent4.vue"

const store = useTabelasStore()
const dadosEditadosTabela1 = ref([])
const dadosEditadosTabela2 = ref([])
const dadosEditadosTabela4 = ref([])

onMounted(() => {
  if (!store.tabela1.length || !store.tabela2.length) {
    store.inicializarTabelas()
  }
})

const tabela3 = computed(() => {
  if (!store.tabela1.length || !store.tabela2.length) return []
  return store.tabela1.map((row, i) => {
    const row2 = store.tabela2[i] || {}
    return {
      descricao: row.descricao,
      jan_2024: (row.jan_2024 || 0) + (row2.jan_2024 || 0),
      fev_2024: (row.fev_2024 || 0) + (row2.fev_2024 || 0),
      jan_2025: (row.jan_2025 || 0) + (row2.jan_2025 || 0),
      fev_2025: (row.fev_2025 || 0) + (row2.fev_2025 || 0),
      perc_projetado: (row.perc_projetado || 0) + (row2.perc_projetado || 0)
    }
  })
})

// Função para enviar os dados editados para o back-end
async function enviarTabela1() {
  try {
    console.log('dados tabela 1', JSON.stringify(dadosEditadosTabela1.value));
    // Aqui você pode fazer o fetch/axios para enviar ao backend
  } catch (e) {
    alert("Erro ao enviar Tabela 1")
  }
}

async function enviarTabela4() {
  // Envie store.tabela4 para o back-end
 
console.log('Dados Tabela 4 -->', JSON.stringify(dadosEditadosTabela4.value));

}

async function enviarTabela2() {
  try {
    console.log('dados tabela 2', JSON.stringify(dadosEditadosTabela2.value));
    // Aqui você pode fazer o fetch/axios para enviar ao backend
  } catch (e) {
    alert("Erro ao enviar Tabela 2")
  }
}

function atualizarTabela4Pinia(grupos) {
  store.setTabela4({ grupos })
}
</script>

<template>
    <button @click="enviarTabela1">Enviar Tabela 1</button> <br></br>
    <button @click="enviarTabela2">Enviar Tabela 2</button>
    <button @click="enviarTabela4">Enviar Tabela 4</button>
   
   <h2>Tabela 1</h2>
  <Tabela1
    :initialData="store.tabela1"
    :editable="true"
    tabelaKey="tabela1"
    @update-edited="dadosEditadosTabela1 = $event"
  /> <br></br>


  <!-- <h2>Tabela 2</h2>
  <Tabela2
    :initialData="store.tabela2"
    :editable="true"
    tabelaKey="tabela2"
    @update-edited="dadosEditadosTabela2 = $event"
  />


  <h2>Tabela 3 (Soma automática)</h2>
  <Tabela1 :initialData="tabela3" :editable="false" /> -->

<TableComponent4
  v-if="store.tabela4 && Array.isArray(store.tabela4.grupos)"
  :grupos="store.tabela4.grupos"
  @update-edited="dadosEditadosTabela4 = $event"
/>
</template>