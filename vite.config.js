import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    base: "/welfare_plus_app/",
    pagesDir: [
        {
            dir: "src/pages",
            baseRoute: "/welfare_plus_app",
        },
    ],
    plugins: [react()],
    optimizeDeps: {
        include: ["styled-components"],
    },
});
