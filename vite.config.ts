import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // Simulates a browser DOM so React components can be rendered in tests.
    environment: 'jsdom',
    // Lets tests use describe/it/expect without importing them each time.
    globals: true,
    // Runs before every test file (registers jest-dom matchers, starts the mock server).
    setupFiles: './src/test/setup.ts',
  },
})