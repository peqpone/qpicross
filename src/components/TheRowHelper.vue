<script setup lang="ts">
import useGameStore from '@/stores/game';
import { computed } from 'vue';

const gameStore = useGameStore();
const size = computed(() => gameStore.squareSize);

</script>
<template>
  <div class="row-helper-container">
    <div v-for="(helper, key) in gameStore.rowHelper" :key class="row-helper">
      <div v-for="(value, valueKey) in helper" :key="valueKey">
        {{ value }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.row-helper-container {
  font-size: v-bind('`${size / 8}ex`');
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: absolute;
  right: 100%;
  margin-right: 0.5em;
  .row-helper {
    display: flex;
    height: v-bind('`${size / 1}px`');
    gap: 0.5em;
    div {
      width: 1rem;
      height: v-bind('`${size / 1}px`');
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
