import {
  onBeforeMount, ref, watch, computed,
} from 'vue';
import { defineStore } from 'pinia';

type Square = 1 | 0;
type Column = Array<Square>;
type Board = Array<Column>;
type Helper = Array<Array<number | never>>;

export default defineStore('game', () => {
  const squareSize = ref(20);
  const boardSize = ref(10);

  const resultBoard = ref<Board>([]);

  const fontSize = computed(() => squareSize.value/8);

  const columnHelper = computed<Helper>(() => resultBoard.value[0]
    .map((_, index) => {
      let count = 0;
      const result = [];
      resultBoard.value.forEach((row) => {
        const square = row[index];
        if (square === 1) {
          count += 1;
        } else if (count > 0) {
          result.push(count);
          count = 0;
        }
      });
      if (count > 0) {
        result.push(count);
      }
      return result;
    }));
  const rowHelper = computed<Helper>(() => resultBoard.value
    .map((row) => {
      let count = 0;
      const result = [];
      row.forEach((square) => {
        if (square === 1) {
          count += 1;
        } else if (count > 0) {
          result.push(count);
          count = 0;
        }
      });
      if (count > 0) {
        result.push(count);
      }
      return result;
    }));

  const changeSquare = (row: number, column: number) => {
    const square = resultBoard.value[row][column];
    resultBoard.value[row][column] = square === 0
      ? 1
      : 0;
  };

  const initBoard = () => {
    resultBoard.value = Array
      .from({ length: boardSize.value }, () => Array
        .from({ length: boardSize.value }, () => 0 as Square));
  };

  const getRow = (row: number): Column => resultBoard.value[row];

  const getColumn = (column: number): Column => resultBoard.value.map((row) => row[column]);

  const generateRandom = () => {
    resultBoard.value = Array
      .from({ length: boardSize.value }, () => Array
        .from({ length: boardSize.value }, () => (Math.random() > 0.5 ? 1 : 0 as Square)));
  };

  onBeforeMount(() => {
    console.log('Game store mounted');
    initBoard();
  });

  watch(boardSize, () => {
    initBoard();
  });

  return {
    resultBoard,
    columnHelper,
    rowHelper,
    changeSquare,
    boardSize,
    squareSize,
    fontSize,
    getColumn,
    getRow,
    generateRandom,
  };
});
