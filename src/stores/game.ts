import {
  computed, onBeforeMount, ref, watch,
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

  const getRow = (row: number, board = resultBoard): Column => board.value[row];

  const getColumn = (column: number, board = resultBoard): Column => board.value
    .map((row) => row[column]);

  const fillRowWithUndefined = (row: number) => {
    gameBoard.value[row] = getRow(row, gameBoard)
      .map((square) => (square === 0 ? undefined : square));
  };

  const fillColumnWithUndefined = (column: number) => {
    gameBoard.value.forEach((row, index) => {
      if (row[column] === 0) {
        gameBoard.value[index][column] = undefined;
      }
    });
  };

  const isRowCompleted = (row: number) => {
    const resultRow = getRow(row);
    const gameRow = getRow(row, gameBoard)
      .map((square) => (square === undefined ? 0 : square));
    return resultRow.every((square, index) => square === gameRow[index]);
  };

  const isColumnCompleted = (column: number) => {
    const resultColumn = getColumn(column);
    const gameColumn = getColumn(column, gameBoard)
      .map((square) => (square === undefined ? 0 : square));
    return resultColumn.every((square, index) => square === gameColumn[index]);
  };

  const isGameCompleted = computed(() => isGameStarted.value
      && resultBoard.value.every((_, index) => isRowCompleted(index))
        && resultBoard.value[0].every((_, index) => isColumnCompleted(index)));

  const fillEmptySquares = (row: number, column: number) => {
    if (isRowCompleted(row)) {
      fillRowWithUndefined(row);
    }
    if (isColumnCompleted(column)) {
      fillColumnWithUndefined(column);
    }
  };

  const changeSquare = (row: number, column: number) => {
    const board = isGameStarted.value ? gameBoard : resultBoard;
    const square = board.value[row][column];

    if (drawMode.value) {
      board.value[row][column] = square === 0
        ? 1
        : 0;
    } else {
      board.value[row][column] = square === undefined
        ? 0
        : undefined;
    }
    fillEmptySquares(row, column);
  };

  const getEmptyBoard = () => Array
    .from({ length: boardSize.value }, () => Array
      .from({ length: boardSize.value }, () => 0 as Square));

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
    isColumnCompleted,
    isRowCompleted,
    isGameCompleted,
  };
});
