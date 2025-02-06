import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import postCssNesting from "postcss-nesting";
import autoprefixer from "autoprefixer";
import cssnanoPlugin from "cssnano";
import tailwindcss from "tailwindcss";

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    postcss: {
      plugins: [
        postCssNesting(),
        tailwindcss(),
        autoprefixer(),
        cssnanoPlugin({
          preset: "default",
        }),
      ],
    },
  },
});
