import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import sassDts from "vite-plugin-sass-dts";
import mkcert from "vite-plugin-mkcert";
import path from "path";

const __dirname = path.resolve();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sassDts(), mkcert()],
  resolve: {
    alias: [{ find: "@", replacement: `${__dirname}/src` }],
  },
  server: {
    host: "localhost",
    proxy: {
      "/kdt5": {
        target: "http://52.78.195.183:3003/api",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/kdt5/, ""),
      },
    },
  },
});
