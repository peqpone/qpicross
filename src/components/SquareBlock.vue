<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useTheme } from 'vuetify';
import useGameStore from '@/stores/game';
import { useElementHover, useMousePressed } from '@vueuse/core';

const props = defineProps<{
  column: number;
  row: number;
}>();

const squareElement = ref();

const gameStore = useGameStore();
const isHovered = useElementHover(squareElement);
const { pressed } = useMousePressed();

const theme = useTheme();
const isDark = computed(() => theme.global.current.value.dark);
const squareFilled = computed(() => (isDark.value ? '#e8e8e8' : 'black'));
const squareEmpty = computed(() => (isDark.value ? '#2d2d2d' : 'white'));
const borderColor = computed(() => (isDark.value ? '#505050' : '#b9b9b9'));

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

watch(isHovered, (value) => {
  if (value && pressed.value) {
    changeSquareState();
  }
});

</script>

<template>
  <div
    class="square"
    :class="squareClass"
    ref="squareElement"
    @mousedown="changeSquareState"
  >
    <v-icon v-if="state === undefined" icon="mdi-close" />
  </div>
</template>

<style scoped lang="less">
@border-style: solid;
@size: v-bind(size);

.square {
  width: @size;
  height: @size;
  outline: 1px @border-style v-bind(borderColor);
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: v-bind('`${isRowFiveModule ? 2 : 0}px`') @border-style v-bind(borderColor);
  border-right: v-bind('`${isColumnFiveModule ? 2 : 0}px`') @border-style v-bind(borderColor);
  font-size: v-bind(fontSize);
  color: v-bind(borderColor);
  &.black {
    background-color: v-bind(squareFilled);
  }
  &.white {
    background-color: v-bind(squareEmpty);
  }
}
</style>
