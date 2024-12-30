<script setup lang="ts">
import { computed } from 'vue';
import useGameStore from '@/stores/game';

const props = defineProps<{
  column: number;
  row: number;
}>();

const gameStore = useGameStore();

const board = computed(() => (
  gameStore.isGameStarted
    ? gameStore.gameBoard
    : gameStore.resultBoard
));
const state = computed(() => board.value[props.row][props.column]);

const size = computed(() => `${gameStore.squareSize}px`);
const fontSize = computed(() => `${gameStore.fontSize}ex`);

const isRowFiveModule = computed(() => {
  if (props.row === board.value.length - 1) {
    return false;
  }
  return (props.row + 1) % 5 === 0;
});

const isColumnFiveModule = computed(() => {
  if (props.column === board.value[0].length - 1) {
    return false;
  }
  return (props.column + 1) % 5 === 0;
});

const squareClass = computed(() => {
  if (state.value === undefined) {
    return 'white';
  }
  return state.value === 1
    ? 'black'
    : 'white';
});

const changeSquareState = () => {
  gameStore.changeSquare(props.row, props.column);
};

</script>

<template>
  <div
    class="square"
    :class="squareClass"
    @mousedown="changeSquareState"
    @keydown="changeSquareState"
  >
    <v-icon v-if="state === undefined" icon="mdi-close" />
  </div>
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
  font-size: v-bind(fontSize);
  color: @border-color;
  &.black {
    background-color: black;
  }
  &.white {
    background-color: white;
  }
}
</style>
