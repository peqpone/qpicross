<script setup lang="ts">
import { computed } from 'vue';
import useGameStore from '@/stores/game';

type Square = 1 | 0;
type Column = Array<Square>;
type Board = Array<Column>;

const props = defineProps<{
  column: number;
  row: number;
  board: Board;
}>();

const gameStore = useGameStore();
const state = computed(() => props.board[props.row][props.column]);
const size = computed(() => gameStore.squareSize);
const isRowFiveModule = computed(() => {
  if (props.row === props.board.length - 1) {
    return false;
  }
  return (props.row + 1) % 5 === 0;
});
const isColumnFiveModule = computed(() => {
  if (props.column === props.board[0].length - 1) {
    return false;
  }
  return (props.column + 1) % 5 === 0;
});

const squareClass = computed(() => (state.value === 1
  ? 'black'
  : 'white'));
</script>

<template>
  <div
    class="square"
    :class="squareClass"
    @click="gameStore.changeSquare(row, column)"
    @keydown="gameStore.changeSquare(row, column)"
  />
</template>

<style scoped>

.square {
  width: v-bind('`${size}px`');
  height: v-bind('`${size}px`');
  outline: 1px solid #b9b9b9;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: v-bind('`${isRowFiveModule ? 2 : 0}px`') solid #b9b9b9;
  border-right: v-bind('`${isColumnFiveModule ? 2 : 0}px`') solid #b9b9b9;
  &.black {
    background-color: black;
  }
  &.white {
    background-color: white;
  }
}
</style>
