import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(), 
    mode === "development" && componentTagger(),
    mode === "production" && visualizer({
      filename: "dist/stats.html",
      open: false,
      gzipSize: true,
      brotliSize: true,
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core vendor libraries
          'vendor-react': ['react', 'react-dom'],
          // UI components and utilities
          'vendor-ui': ['lucide-react', 'framer-motion'],
          // Utility libraries
          'vendor-utils': ['@tanstack/react-query'],
        },
        // Optimize chunk naming
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
    // Optimize images in production
    assetsInlineLimit: 4096, // Inline assets smaller than 4kb
    // Enable advanced optimizations
    cssCodeSplit: true,
    minify: 'esbuild',
    // Reduce bundle size
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Improve chunking
    chunkSizeWarningLimit: 600,
  },
}));
