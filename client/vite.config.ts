import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  const tsConfigPath = mode === 'development' ? './tsconfig.dev.json' : './tsconfig.json';

  return {
    plugins: [
      tailwindcss(),
      reactRouter(),
      tsconfigPaths({
        projects: [tsConfigPath],
      }),
    ],
    define: {
      global: 'window',
    },
    server: {
      host: process.env.HOST || true,
    },
  };
});