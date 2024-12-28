<script setup lang="ts">
import SquareBlock from '@/components/SquareBlock.vue';
import useGameStore from '@/stores/game';
import { computed } from 'vue';

const gameStore = useGameStore();
const size = computed(() => gameStore.squareSize);

const getInfo = (row: number, column: number) => {
  console.log(row, column);
  console.log('row', row, gameStore.getRow(row));
  console.log('column', column, gameStore.getColumn(column));
};

</script>

<template>
  <div class="container">
    <div class="title-container">qpicross</div>
    <div class="board-container">
      <div class="column-helper-container">
        <div v-for="(helper, key) in gameStore.columnHelper" :key class="column-helper">
          <div v-for="(value, valueKey) in helper" :key="valueKey">
            {{ value }}
          </div>
        </div>
      </div>
      <div class="row-helper-container">
        <div v-for="(helper, key) in gameStore.rowHelper" :key class="row-helper">
          <div v-for="(value, valueKey) in helper" :key="valueKey">
            {{ value }}
          </div>
        </div>
      </div>
      <div class="board">
        <div v-for="(row, rowKey) in gameStore.resultBoard" :key="rowKey" class="row">
          <square-block
            v-for="(_, columnKey) in row"
            :column="columnKey"
            :row="rowKey"
            :key="`${columnKey}-${rowKey}`"
            :board="gameStore.resultBoard"
            @click="getInfo(rowKey, columnKey)"
          />
        </div>
      </div>
    </div>
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
    </div>
  </div>
</template>

<style scoped lang="less">
.container {
  position: relative;
  display: flex;
  justify-content: center;
  height: 100%;
  align-items: center;
}
.title-container {
  font-size: 2rem;
  margin-bottom: 1em;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  text-align: center;
}
.board-container {
  position: relative;
}
.row {
  display: flex;
}
.column {
  display: flex;
}
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
.controls-container {
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
}

</style>
