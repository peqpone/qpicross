<script setup lang="ts">
import useGameStore from '@/stores/game';
import SquareBlock from '@/components/SquareBlock.vue';

const gameStore = useGameStore();
</script>
<template>
  <div class="board">
    <div v-for="(row, rowKey) in gameStore.resultBoard" :key="rowKey" class="d-flex">
      <square-block
        v-for="(_, columnKey) in row"
        :column="columnKey"
        :row="rowKey"
        :key="`${columnKey}-${rowKey}`"
      />
    </div>
  </div>
</template>
