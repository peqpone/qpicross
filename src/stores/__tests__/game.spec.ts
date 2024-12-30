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
    gameStore.resetGame();
  });
  it('should change square', () => {
    expect(gameStore.resultBoard[0][0]).toBe(0);
    gameStore.changeSquare(0, 0);
    expect(gameStore.resultBoard[0][0]).toBe(1);
    gameStore.changeSquare(0, 0);
    expect(gameStore.resultBoard[0][0]).toBe(0);
  });
});
