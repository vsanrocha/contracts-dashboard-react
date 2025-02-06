import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { resolve } from 'path';

vi.mock('vite', () => ({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
}));
