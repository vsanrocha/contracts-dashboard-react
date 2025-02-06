import ResizeObserver from 'resize-observer-polyfill';

if (typeof window !== 'undefined' && !('ResizeObserver' in window)) {
  // @ts-ignore
  window.ResizeObserver = ResizeObserver;
}

if (typeof global !== 'undefined' && !('ResizeObserver' in global)) {
  // @ts-ignore
  global.ResizeObserver = ResizeObserver;
}

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
