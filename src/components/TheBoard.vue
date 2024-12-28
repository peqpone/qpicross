<script setup lang="ts">
import useGameStore from '@/stores/game';
import SquareBlock from '@/components/SquareBlock.vue';

const gameStore = useGameStore();

const getInfo = (row: number, column: number) => {
  console.log(row, column);
  console.log('row', row, gameStore.getRow(row));
  console.log('column', column, gameStore.getColumn(column));
};
</script>
<template>
  <div class="board">
    <div v-for="(row, rowKey) in gameStore.resultBoard" :key="rowKey" class="row">
      <square-block
        v-for="(_, columnKey) in row"
        :column="columnKey"
        :row="rowKey"
        :key="`${columnKey}-${rowKey}`"
        :board="gameStore.resultBoard"
        @click="getInfo(rowKey, columnKey)"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
.row {
  display: flex;
}
.column {
  display: flex;
}
</style>
