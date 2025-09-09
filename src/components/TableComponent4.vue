<template>
  <table border="1">
    <thead>
      <tr>
        <th>Grupo</th>
        <th>Subgrupo</th>
        <th>Descrição</th>
        <th>Jan 2024</th>
        <th>Fev 2024</th>
        <th>Jan 2025</th>
        <th>Fev 2025</th>
        <th>Média 9 meses</th>
        <th>% Projetado</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(grupo, gIdx) in gruposLocal" :key="grupo.nome">
        <tr>
          <td :colspan="9" style="font-weight:bold;">{{ grupo.nome }}</td>
        </tr>
        <template v-for="(subgrupo, sIdx) in grupo.subgrupos" :key="subgrupo.nome">
          <tr>
            <td></td>
            <td :colspan="8" style="font-weight:bold;">{{ subgrupo.nome }}</td>
          </tr>
          <tr v-for="(item, iIdx) in subgrupo.items" :key="item.id">
            <td></td>
            <td></td>
            <td>{{ item.descricao }}</td>
            <td>
              <input type="number" v-model.number="item.jan_2024" @input="onMesChange(item)" />
            </td>
            <td>
              <input type="number" v-model.number="item.fev_2024" @input="onMesChange(item)" />
            </td>
            <td>
              <input type="number" v-model.number="item.jan_2025" @input="onMesChange(item)" />
            </td>
            <td>
              <input type="number" v-model.number="item.fev_2025" @input="onMesChange(item)" />
            </td>
            <td>
              <input type="number" v-model.number="item.media_9_meses" @input="updateStore" />
            </td>
            <td>
              <input
                type="number"
                v-model.number="item.perc_projetado"
                @input="onPercentChange(item)"
              />
            </td>
          </tr>
        </template>
      </template>
    </tbody>
  </table>
</template>

<script setup>
import { ref, watch } from "vue"
import { useTabelasStore } from "../stores/tabelas"

const props = defineProps({
  grupos: { type: Array, required: true }
})

const emit = defineEmits(["update-edited"])

const store = useTabelasStore()
const gruposLocal = ref(Array.isArray(props.grupos) ? JSON.parse(JSON.stringify(props.grupos)) : [])
const editedItems = ref([])

function updateStoreAndTrack(item) {
  // Atualiza o store normalmente
  store.setTabela4({ grupos: gruposLocal.value })

  // Marca o item como editado
  const idx = editedItems.value.findIndex(e => e.id === item.id)
  if (idx === -1) {
    editedItems.value.push({ ...item })
  } else {
    editedItems.value[idx] = { ...item }
  }
  emit("update-edited", editedItems.value)
}

// Quando o percentual é alterado, recalcula os meses
function onPercentChange(item) {
  const media = Number(item.media_9_meses) || 0
  const perc = Number(item.perc_projetado) || 0
  const novoValor = Number((media + (media * perc / 100)).toFixed(2))
  item.jan_2024 = novoValor
  item.fev_2024 = novoValor
  item.jan_2025 = novoValor
  item.fev_2025 = novoValor
  updateStoreAndTrack(item)
}

// Quando um dos meses é alterado, recalcula o percentual projetado
function onMesChange(item) {
  const media = Number(item.media_9_meses) || 0
  const valores = [
    Number(item.jan_2024) || 0,
    Number(item.fev_2024) || 0,
    Number(item.jan_2025) || 0,
    Number(item.fev_2025) || 0
  ]
  const mediaMeses = valores.reduce((a, b) => a + b, 0) / valores.length
  if (media !== 0) {
    item.perc_projetado = Number((((mediaMeses - media) / media) * 100).toFixed(2))
  } else {
    item.perc_projetado = 0
  }
  updateStoreAndTrack(item)
}

watch(
  () => props.grupos,
  (newVal) => {
    gruposLocal.value = Array.isArray(newVal) ? JSON.parse(JSON.stringify(newVal)) : []
    editedItems.value = []
  }
)
</script>