import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
  const target = mode === "offline" ? "offline" : "online";
  const rootDir = resolve(__dirname, target);

  const inputs =
    target === "offline"
      ? {
          login: resolve(rootDir, "login.html"),
          status: resolve(rootDir, "status.html"),
        }
      : {
          login: resolve(rootDir, "login.html"),
          status: resolve(rootDir, "status.html"),
          redirect: resolve(rootDir, "redirect.html"),
          alogin: resolve(rootDir, "alogin.html"),
          error: resolve(rootDir, "error.html"),
          logout: resolve(rootDir, "logout.html"),
        };

  return {
    // IMPORTANT:
    // Set Vite "root" to the target folder so output becomes:
    // dist/<target>/login.html (NOT dist/<target>/<target>/login.html)
    root: rootDir,
    base: "./",
    plugins: [react()],
    // Public assets copied into dist/<target> root
    publicDir: resolve(__dirname, `public/${target}`),
    server: {
      fs: {
        // allow importing /src from project root while serving from /online or /offline
        allow: [resolve(__dirname)],
      },
    },
    build: {
      outDir: resolve(__dirname, `dist/${target}`),
      emptyOutDir: false,
      assetsDir: "assets",
      rollupOptions: {
        input: inputs,
        output: {
          entryFileNames: "js/[name].js",
          chunkFileNames: "js/chunks/[name].js",
          assetFileNames: (assetInfo) => {
  const name = assetInfo.name || "";
  const ext = name.split(".").pop()?.toLowerCase() || "";
  if (ext === "css") return "css/[name][extname]";
  if (["png","jpg","jpeg","gif","svg","webp","ico"].includes(ext)) return "img/[name][extname]";
  if (["woff","woff2","ttf","otf","eot"].includes(ext)) return "fonts/[name][extname]";
  return "assets/[name][extname]";
},
        },
      },
    },
  };
});
