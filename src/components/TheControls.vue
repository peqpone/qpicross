<script setup lang="ts">
import useGameStore from '@/stores/game';

const gameStore = useGameStore();
</script>
<template>
  <div class="controls-container">
    <v-slider label="square size" v-model="gameStore.squareSize" :min="10" :max="30" :step="1">
      <template v-slot:append>
        <v-text-field
          v-model="gameStore.squareSize"
          density="compact"
          type="number"
          variant="outlined"
          hide-details
        />
      </template>
    </v-slider>
    <v-slider label="board size" v-model="gameStore.boardSize" :min="10" :max="30" :step="1">
      <template v-slot:append>
        <v-text-field
          v-model="gameStore.boardSize"
          density="compact"
          type="number"
          variant="outlined"
          hide-details
        />
      </template>
    </v-slider>
    <v-btn @click="gameStore.generateRandom">Random</v-btn>
    <v-btn @click="gameStore.startGame">Start</v-btn>
    <v-btn @click="gameStore.resetGame">Reset</v-btn>
  </div>
</template>

<style scoped lang="less">
.controls-container {
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
}

</style>
