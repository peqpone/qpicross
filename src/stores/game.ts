import {
  onBeforeMount, ref, watch, computed,
} from 'vue';
import { defineStore } from 'pinia';

type Square = 1 | 0 | undefined;
type Column = Array<Square>;
type Board = Array<Column>;
type Helper = Array<Array<number | never>>;

export default defineStore('game', () => {
  const squareSize = ref(20);
  const boardSize = ref(10);
  const isGameStarted = ref(false);
  const level = ref(0.4);
  const drawMode = ref(true);

  const resultBoard = ref<Board>([]);
  const gameBoard = ref<Board>([]);

  const fontSize = computed(() => squareSize.value / 10);

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
    const board = isGameStarted.value ? gameBoard : resultBoard;
    const square = board.value[row][column];
    console.log('changeSquare', row, column, square);

    if (drawMode.value) {
      board.value[row][column] = square === 0
        ? 1
        : 0;
    } else {
      board.value[row][column] = square === undefined
        ? 0
        : undefined;
    }
  };

  const getEmptyBoard = () => Array
    .from({ length: boardSize.value }, () => Array
      .from({ length: boardSize.value }, () => 0 as Square));

  const getRow = (row: number): Column => resultBoard.value[row];

  const getColumn = (column: number): Column => resultBoard.value.map((row) => row[column]);

  const resetGame = () => {
    isGameStarted.value = false;
    resultBoard.value = getEmptyBoard();
    gameBoard.value = getEmptyBoard();
    drawMode.value = true;
  };

  const generateRandom = () => {
    resetGame();
    resultBoard.value = Array
      .from({ length: boardSize.value }, () => Array
        .from({ length: boardSize.value }, () => (Math.random() > level.value ? 1 : 0 as Square)));
  };

  const startGame = () => {
    isGameStarted.value = true;
  };

  onBeforeMount(() => {
    console.log('Game store mounted');

    resetGame();
  });

  watch(boardSize, () => {
    resetGame();
  });

  return {
    resultBoard,
    gameBoard,
    level,
    drawMode,
    columnHelper,
    rowHelper,
    changeSquare,
    boardSize,
    squareSize,
    fontSize,
    getColumn,
    getRow,
    generateRandom,
    startGame,
    isGameStarted,
    resetGame,
  };
});
