import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
    base: "./",
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate",
            includeAssets: ["favicon.png"],
            manifest: {
                name: "Welfare Plus",
                short_name: "Welfare+",
                start_url: "/welfare_plus_app/",
                display: "standalone",
                background_color: "#ffffff",
                theme_color: "#FF6F61",
                icons: [
                    {
                        src: "favicon.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "favicon.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                ],
            },
        }),
    ],
    optimizeDeps: {
        include: ["styled-components"],
    },
});
