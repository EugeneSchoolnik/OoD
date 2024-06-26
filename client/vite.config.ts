import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import './src/assets/styles/variables.scss';
        @import './src/assets/styles/mixins.scss';`,
      },
    },
  },
  build: {
    outDir: "../resources",
  },
});
