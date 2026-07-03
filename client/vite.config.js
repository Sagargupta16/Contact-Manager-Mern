import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  // GitHub Pages serves the app from /Contact-Manager-Mern/
  base: mode === "production" ? "/Contact-Manager-Mern/" : "/",
  plugins: [react()],
  // Keep CRA-era conventions so the deploy workflow needs no changes:
  // output to build/ and expose REACT_APP_* env vars.
  envPrefix: ["VITE_", "REACT_APP_"],
  build: {
    outDir: "build",
  },
  server: {
    port: 3000,
    proxy: {
      "/api": "http://localhost:3006",
    },
  },
}));
