import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import postcssNesting from "postcss-nesting";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
    base: "./",
    plugins: [react()],
    css: {
        postcss: {
            plugins: [postcssNesting],
        },
    },
    resolve: {
        alias: [{ find: "@", replacement: resolve(__dirname, "./src") }],
    },
    build: {
        assetsInlineLimit: 0,
    },
});
