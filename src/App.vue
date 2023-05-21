<script setup lang="ts">
import { computed, ref } from "vue";
import { useMatrixWorker } from "@/composables/useMatrixWorker";

const a = computed(() => {
  let count = 1;
  const result = new Array(rowCount.value);

  for (let i = 0; i < rowCount.value; i++) {
    result[i] = new Array(columnCount.value);
    for (let j = 0; j < columnCount.value; j++) {
      result[i][j] = count++;
    }
  }

  return result;
});

const b = computed(() => {
  let count = 1;
  const result = new Array(columnCount.value);

  for (let i = 0; i < columnCount.value; i++) {
    result[i] = new Array(rowCount.value);
    for (let j = 0; j < rowCount.value; j++) {
      result[i][j] = count++;
    }
  }

  return result;
});

const countOptions = ref([2, 3, 200, 300, 20000, 30000]);
const rowCount = ref(2);
const columnCount = ref(3);

const { result, fetching } = useMatrixWorker(a, b);
</script>

<template>
  <div class="container">
    <div class="control-container">
      <label v-for="option in countOptions" :key="option">
        <input type="radio" :value="option" v-model="rowCount" />
        {{ option }}
      </label>

      <label v-for="option in countOptions" :key="option">
        <input type="radio" :value="option" v-model="columnCount" />
        {{ option }}
      </label>
    </div>
    <div class="matrix-container">
      <div class="table-container">
        <table class="matrix-table" v-if="a">
          <tr v-for="(row, i) in a" :key="`r-${i}`">
            <td v-for="(number, j) in row" :key="`d-${j}`">{{ number }}</td>
          </tr>
        </table>
      </div>
      <span>&times;</span>
      <div class="table-container">
        <table class="matrix-table" v-if="b">
          <tr v-for="(row, i) in b" :key="`r-${i}`">
            <td v-for="(number, j) in row" :key="`d-${j}`">{{ number }}</td>
          </tr>
        </table>
      </div>
      <span>&equals;</span>

      <div class="table-container">
        <div class="loading" v-if="fetching">
          <h1>Loading</h1>
        </div>
        <table class="matrix-table result" v-else-if="result">
          <tr v-for="(row, i) in result" :key="`r-${i}`">
            <td v-for="(number, j) in row" :key="`d-${j}`">{{ number }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.matrix-container {
  align-self: center;
  display: grid;
  gap: 1em;
  grid-template-columns: 1fr min-content 1fr min-content 1fr;
  grid-template-rows: 1fr;
}

.matrix-container > span {
  font-size: 1.5em;
  align-self: center;
  justify-self: center;
}

.matrix-table {
  padding: 1em;
  border: 1px solid black;
  background-color: salmon;
  color: black;
  font-family: monospace;
  font-size: 1.5em;
  text-align: center;
  height: 100%;
  width: 100%;
}

.table-container {
  height: 300px;
  width: 400px;
  overflow: auto;
}
</style>
