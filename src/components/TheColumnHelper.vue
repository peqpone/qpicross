<script setup lang="ts">
import useGameStore from '@/stores/game';
import { computed } from 'vue';

const gameStore = useGameStore();
const size = computed(() => `${gameStore.squareSize}px`);
const fontSize = computed(() => `${gameStore.fontSize}ex`);

</script>
<template>
  <div class="column-helper-container">
    <div v-for="(helper, key) in gameStore.columnHelper" :key class="column-helper">
      <div v-for="(value, valueKey) in helper" :key="valueKey">
        {{ value }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.column-helper-container {
  font-size: v-bind(fontSize);
  display: flex;
  margin-bottom: 0.5em;
  position: absolute;
  bottom: 100%;
  left: 0;
  .column-helper {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: v-bind(size);
    gap: 0.5em;
    div {
      width: v-bind(size);
      height: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
