<script setup lang="ts">
import useGameStore from '@/stores/game';
import { computed } from 'vue';

const gameStore = useGameStore();
const size = computed(() => gameStore.squareSize);

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
  font-size: v-bind('`${size / 8}ex`');
  display: flex;
  margin-bottom: 0.5em;
  position: absolute;
  bottom: 100%;
  left: 0;
  .column-helper {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: v-bind('`${size / 1}px`');
    gap: 0.5em;
    div {
      width: v-bind('`${size / 1}px`');
      height: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
