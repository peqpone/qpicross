<script setup lang="ts">
import useGameStore from '@/stores/game';

const gameStore = useGameStore();
</script>

<template>
  <v-dialog
    persistent
    :model-value="gameStore.isGameCompleted"
    width="50%"
  >
    <v-card class="d-flex align-center pa-5">
      <v-card-text>
        <v-icon size="x-large" color="warning" icon="mdi-trophy" />
      </v-card-text>

      <v-card-actions>
        <v-btn
          icon="mdi-restart"
          @click="gameStore.resetGame"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
