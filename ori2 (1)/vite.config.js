import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { resolve } from "path"

export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    rollupOptions: {
      input: {
        login: resolve(__dirname, "login.html"),
        status: resolve(__dirname, "status.html"),
        logout: resolve(__dirname, "logout.html"),
        error: resolve(__dirname, "error.html"),
        redirect: resolve(__dirname, "redirect.html"),
        redirectx: resolve(__dirname, "redirectx.html")
      }
    }
  }
})
