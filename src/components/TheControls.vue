<script setup lang="ts">
import useGameStore from '@/stores/game';

const gameStore = useGameStore();
const {
  startGame, resetGame, generateRandom,
} = gameStore;
</script>

<template>
  <div class="controls-container">
    <div v-if="!gameStore.isGameStarted">
      <v-slider v-model="gameStore.squareSize" :min="10" :max="30" :step="1">
        <template #prepend>
          <v-icon icon="mdi-resize" />
        </template>
        <template v-slot:append>
          {{ gameStore.squareSize }}
        </template>
      </v-slider>

      <v-slider
        v-model="gameStore.level"
        :min="0.2"
        :max="0.7"
        :step="0.1"
      >
        <template #prepend>
          <v-icon icon="mdi-arm-flex" />
        </template>
        <template v-slot:append>
          {{ gameStore.level }}
        </template>
      </v-slider>
      <v-slider
        v-model="gameStore.boardSize"
        :min="5"
        :max="30"
        :step="5"
      >
        <template #prepend>
          <v-icon icon="mdi-view-grid-plus" />
        </template>
        <template v-slot:append>
          {{ gameStore.boardSize }}
        </template>
      </v-slider>
    </div>
    <div class="buttons-container">
      <v-btn v-if="!gameStore.isGameStarted" @click="generateRandom" icon="mdi-dice-multiple" />
      <v-btn @click="gameStore.isGameStarted ? resetGame() : startGame()" :icon="gameStore.isGameStarted ? 'mdi-stop' : 'mdi-play'" />
    </div>
  </div>
</template>

<style scoped lang="less">
.controls-container {
  position: absolute;
  bottom: 10px;
  right: 10px;
  left: 10px;
  display: grid;
  .buttons-container {
    display: flex;
    justify-content: center;
    gap: 1em;
  }
}

</style>
