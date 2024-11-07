/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './test-utils/setupTests.ts',
    coverage: {
      exclude: [
        '**/browser.ts', // Added these to be excluded from coverage
        '**/handler.ts',
        'cypress',
        'test-utils',
        'public',
        'cypress.config.js',
      ],
      provider: 'istanbul',
      reporter: ['text', 'json', 'html'],
    },
  },
});
