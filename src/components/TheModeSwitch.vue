<script setup lang="ts">
import useGameStore from '@/stores/game';

const gameStore = useGameStore();
</script>

<template>
  <div class="switch">
    <v-btn-toggle
      v-if="gameStore.isGameStarted"
      v-model="gameStore.drawMode"
      :icon="gameStore.drawMode ? 'mdi-pencil' : 'mdi-close'"
      rounded="xl"

    >
      <v-btn icon="mdi-pencil" :value="true" />
      <v-btn icon="mdi-close" :value="false" />
    </v-btn-toggle>
  </div>
</template>

<style scoped lang="less">
.switch {
  margin-top: 1em;
  display: flex;
  justify-content: center;
}
</style>
