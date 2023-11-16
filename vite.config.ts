import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import { resolve } from "path";
export default defineConfig({
  resolve: {
    alias: {
      "@pages": resolve(__dirname, "src", "pages"),
      "@components": resolve(__dirname, "src", "components"),
      "@stores": resolve(__dirname, "src", "stores"),
      "@services": resolve(__dirname, "src", "services"),
      "@utils": resolve(__dirname, "src", "utils"),
    },
  },
  server: {
    proxy: {
      // 配置代理规则
      "/testApi": {
        target: "http://127.0.0.1:9999",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/testApi/, ""),
      },
    },
  },
  plugins: [react()],
});
