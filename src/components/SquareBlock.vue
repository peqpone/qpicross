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
const size = computed(() => `${gameStore.squareSize}px`);
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

<style scoped lang="less">
@border-style: solid;
@border-color: #b9b9b9;
@size: v-bind(size);

.square {
  width: @size;
  height: @size;
  outline: 1px @border-style @border-color;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: v-bind('`${isRowFiveModule ? 2 : 0}px`') @border-style @border-color;
  border-right: v-bind('`${isColumnFiveModule ? 2 : 0}px`') @border-style @border-color;
  &.black {
    background-color: black;
  }
  &.white {
    background-color: white;
  }
}
</style>
