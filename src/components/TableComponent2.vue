<template>
  <table border="1">
    <thead>
      <tr>
        <th>Descrição</th>
        <th>Jan 2024</th>
        <th>Fev 2024</th>
        <th>Jan 2025</th>
        <th>Fev 2025</th>
        <th>Média</th>
        <th>% Projetado</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, i) in rows" :key="i">
        <td>{{ row.descricao }}</td>
        <template v-if="editable">
          <td><input type="number" v-model.number="rows[i].jan_2024" @input="update(i)" /></td>
          <td><input type="number" v-model.number="rows[i].fev_2024" @input="update(i)" /></td>
          <td><input type="number" v-model.number="rows[i].jan_2025" @input="update(i)" /></td>
          <td><input type="number" v-model.number="rows[i].fev_2025" @input="update(i)" /></td>
          <td>{{ calcularMedia(row) }}</td>
          <td>
            <input
              type="number"
              v-model.number="rows[i].perc_projetado"
              @input="onPercentChange(i)"
            />
          </td>
        </template>
        <template v-else>
          <td>{{ row.jan_2024 }}</td>
          <td>{{ row.fev_2024 }}</td>
          <td>{{ row.jan_2025 }}</td>
          <td>{{ row.fev_2025 }}</td>
          <td>{{ calcularMedia(row) }}</td>
          <td>{{ row.perc_projetado }}</td>
        </template>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref, watch } from "vue"
import { useTabelasStore } from "../stores/tabelas"

const props = defineProps({
  initialData: { type: Array, required: true },
  editable: { type: Boolean, default: true },
  tabelaKey: { type: String, required: false, default: "" }
})

const emit = defineEmits(["update-edited"])

const store = useTabelasStore()
const rows = ref(JSON.parse(JSON.stringify(props.initialData)))
const editedRows = ref([])

function calcularMedia(row) {
  const valores = [
    Number(row.jan_2024) || 0,
    Number(row.fev_2024) || 0,
    Number(row.jan_2025) || 0,
    Number(row.fev_2025) || 0
  ]
  const soma = valores.reduce((a, b) => a + b, 0)
  return (soma / valores.length).toFixed(2)
}

function markEdited(i) {
  const already = editedRows.value.findIndex(r => r._idx === i)
  const rowCopy = { ...rows.value[i], _idx: i }
  if (already === -1) {
    editedRows.value.push(rowCopy)
  } else {
    editedRows.value[already] = rowCopy
  }
  const alterados = editedRows.value.map(r => {
    const { _idx, ...rest } = r
    return rest
  })
  emit("update-edited", alterados)
}

function update(i) {
  if (props.tabelaKey && props.editable) {
    store.setTabela2(JSON.parse(JSON.stringify(rows.value)))
    markEdited(i)
  }
}

function onPercentChange(i) {
  const row = rows.value[i]
  const media = Number(calcularMedia(row))
  const perc = Number(row.perc_projetado) || 0
  const novoValor = Number((media + (media * perc / 100)).toFixed(2))
  row.jan_2024 = novoValor
  row.fev_2024 = novoValor
  row.jan_2025 = novoValor
  row.fev_2025 = novoValor
  update(i)
}

watch(
  () => props.initialData,
  (newVal) => {
    rows.value = JSON.parse(JSON.stringify(newVal))
    editedRows.value = []
  }
)
</script>