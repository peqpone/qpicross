<script setup lang="ts">
import useGameStore from '@/stores/game';
import { computed } from 'vue';

const gameStore = useGameStore();
const size = computed(() => `${gameStore.squareSize}px`);
const fontSize = computed(() => `${gameStore.fontSize}ex`);

</script>
<template>
  <div class="row-helper-container">
    <div v-for="(helper, key) in gameStore.rowHelper" :key class="row-helper" :class="gameStore.isRowCompleted(key) ? 'complete' : ''">
      <div v-for="(value, valueKey) in helper" :key="valueKey">
        {{ value }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.row-helper-container {
  font-size: v-bind(fontSize);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: absolute;
  right: 100%;
  margin-right: 0.5em;
  .row-helper {
    display: flex;
    height: v-bind(size);
    gap: 0.5em;
    &.complete {
      opacity: 0.4;
    }
    div {
      width: 1rem;
      height: v-bind(size);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
