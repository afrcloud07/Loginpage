import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import fs from "fs";

function copyFileSafe(src, dst) {
  try {
    fs.copyFileSync(src, dst);
  } catch (e) {
    // ignore
  }
}

export default defineConfig(({ mode }) => {
  const target = mode === "offline" ? "offline" : "online";
  const rootDir = resolve(__dirname, target);
  const outDir = resolve(__dirname, `dist/${target}`);

  const pagesToClone =
    target === "offline"
      ? ["status.html"]
      : ["status.html", "redirect.html", "alogin.html", "error.html", "logout.html"];

  return {
    root: rootDir,
    base: "./",
    plugins: [
      react(),
      {
        name: "clone-html-pages",
        closeBundle() {
          const src = resolve(outDir, "login.html");
          for (const name of pagesToClone) {
            copyFileSafe(src, resolve(outDir, name));
          }
        },
      },
    ],
    publicDir: resolve(__dirname, `public/${target}`),
    server: {
      fs: {
        allow: [resolve(__dirname)],
      },
    },
    build: {
      outDir,
      emptyOutDir: false,
      assetsDir: "assets",
      rollupOptions: {
        // Build hanya dari 1 HTML sumber: login.html
        input: {
          login: resolve(rootDir, "login.html"),
        },
        output: {
          entryFileNames: "js/[name].js",
          chunkFileNames: "js/chunks/[name].js",
          assetFileNames: (assetInfo) => {
            const name = assetInfo.name || "";
            const ext = name.split(".").pop()?.toLowerCase() || "";
            if (ext === "css") return "css/[name][extname]";
            if (["png", "jpg", "jpeg", "gif", "svg", "webp", "ico"].includes(ext)) return "img/[name][extname]";
            if (["woff", "woff2", "ttf", "otf", "eot"].includes(ext)) return "fonts/[name][extname]";
            return "assets/[name][extname]";
          },
        },
      },
    },
  };
});
