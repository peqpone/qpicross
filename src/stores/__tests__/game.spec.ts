import {
  describe, it, beforeEach, expect,
} from 'vitest';
import { createTestingPinia } from '@pinia/testing';

import { shallowMount } from '@vue/test-utils';

import useGameStore from '../game';

describe('Game store', () => {
  shallowMount({ template: '<div/>' }, {
    global: {
      plugins: [createTestingPinia({ stubActions: false })],
    },
  });
  const gameStore = useGameStore();
  beforeEach(async () => {
    gameStore.$patch({
      boardSize: 3,
    });
    gameStore.resetGame();
  });
  describe('changeSquare', () => {
    it('should change square', () => {
      expect(gameStore.resultBoard[0][0]).toBe(0);
      gameStore.changeSquare(0, 0);
      expect(gameStore.resultBoard[0][0]).toBe(1);
      gameStore.changeSquare(0, 0);
      expect(gameStore.resultBoard[0][0]).toBe(0);
    });
  });
  describe('columnHelper', () => {
    it('should return empty column helper', () => {
      expect(gameStore.columnHelper).toEqual([[], [], []]);
    });
    it('should return column helper', () => {
      gameStore.resultBoard = [
        [1, 1, 1],
        [0, 1, 0],
        [1, 0, 1],
      ];
      expect(gameStore.columnHelper).toEqual([[1, 1], [2], [1, 1]]);
    });
  });
  describe('rowHelper', () => {
    it('should return empty row helper', () => {
      expect(gameStore.rowHelper).toEqual([[], [], []]);
    });
    it('should return row helper', () => {
      gameStore.resultBoard = [
        [1, 1, 1],
        [0, 1, 0],
        [1, 0, 1],
      ];
      expect(gameStore.rowHelper).toEqual([[3], [1], [1, 1]]);
    });
  });
  describe('fillColumnWithCrosses', () => {
    it('should fill column with crosses', () => {
      gameStore.gameBoard = [
        [1, 1, 1],
        [0, 1, 0],
        [1, 0, 1],
      ];
      gameStore.fillColumnWithCrosses(0);
      expect(gameStore.gameBoard).toEqual([
        [1, 1, 1],
        [undefined, 1, 0],
        [1, 0, 1],
      ]);
    });
  });
  describe('fillRowWithCrosses', () => {
    it('should fill row with crosses', () => {
      gameStore.gameBoard = [
        [1, 1, 1],
        [0, 1, 0],
        [1, 0, 1],
      ];
      gameStore.fillRowWithCrosses(1);
      expect(gameStore.gameBoard).toEqual([
        [1, 1, 1],
        [undefined, 1, undefined],
        [1, 0, 1],
      ]);
    });
  });
  describe('isGameCompleted', () => {
    it('should return false', () => {
      gameStore.isGameStarted = true;
      gameStore.resultBoard = [
        [0, 0, 1],
        [1, 1, 1],
        [1, 1, 0],
      ];
      gameStore.gameBoard = [
        [0, 0, 1],
        [1, 0, 1],
        [1, 1, 0],
      ];
      expect(gameStore.isGameCompleted).toBe(false);
    });
    it('should return true', () => {
      gameStore.isGameStarted = true;
      gameStore.resultBoard = [
        [0, 0, 1],
        [1, 0, 1],
        [1, 1, 0],
      ];
      gameStore.gameBoard = gameStore.resultBoard;
      expect(gameStore.isGameCompleted).toBe(true);
    });
  });
});
