// vite.config.ts
import { defineConfig } from "file:///Users/rickbot/Documents/GitHub/smejkal-platform/node_modules/.pnpm/vite@5.4.21_@types+node@22.19.12_lightningcss@1.31.1_terser@5.46.0/node_modules/vite/dist/node/index.js";
import react from "file:///Users/rickbot/Documents/GitHub/smejkal-platform/node_modules/.pnpm/@vitejs+plugin-react-swc@3.11.0_vite@5.4.21_@types+node@22.19.12_lightningcss@1.31.1_terser@5.46.0_/node_modules/@vitejs/plugin-react-swc/index.js";
import { sentryVitePlugin } from "file:///Users/rickbot/Documents/GitHub/smejkal-platform/node_modules/.pnpm/@sentry+vite-plugin@5.1.1_rollup@4.59.0/node_modules/@sentry/vite-plugin/dist/esm/index.mjs";
import path from "path";
import { ViteImageOptimizer } from "file:///Users/rickbot/Documents/GitHub/smejkal-platform/node_modules/.pnpm/vite-plugin-image-optimizer@2.0.3_sharp@0.34.5_vite@7.3.1_@types+node@22.19.12_jiti@2.6.1_lig_rnqk673ynvy3mcwz6uorgsvrli/node_modules/vite-plugin-image-optimizer/dist/index.js";
var __vite_injected_original_dirname = "/Users/rickbot/Documents/GitHub/smejkal-platform/apps/web";
var vite_config_default = defineConfig({
  server: {
    host: "::",
    port: 3e3,
    proxy: {
      "/app": {
        target: "http://localhost:3002",
        changeOrigin: true
      }
    },
    headers: {
      "X-Frame-Options": "DENY",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "X-XSS-Protection": "1; mode=block",
      "Permissions-Policy": "camera=(), microphone=(), geolocation=()"
    }
  },
  plugins: [
    react(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ViteImageOptimizer({
      jpg: { quality: 85 },
      jpeg: { quality: 85 },
      png: { quality: 85 },
      webp: { quality: 85 },
      svg: {
        plugins: [
          { name: "removeViewBox", active: false },
          { name: "removeEmptyAttrs", active: false }
        ]
      }
    }),
    sentryVitePlugin({
      org: "smejkal-design",
      project: "javascript-nextjs",
      // Only upload source maps when SENTRY_AUTH_TOKEN is set (CI/Vercel)
      disable: !process.env.SENTRY_AUTH_TOKEN
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  build: {
    outDir: "dist",
    assetsInlineLimit: 4096,
    sourcemap: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvcmlja2JvdC9Eb2N1bWVudHMvR2l0SHViL3NtZWprYWwtcGxhdGZvcm0vYXBwcy93ZWJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9yaWNrYm90L0RvY3VtZW50cy9HaXRIdWIvc21lamthbC1wbGF0Zm9ybS9hcHBzL3dlYi92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvcmlja2JvdC9Eb2N1bWVudHMvR2l0SHViL3NtZWprYWwtcGxhdGZvcm0vYXBwcy93ZWIvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2MnO1xuaW1wb3J0IHsgc2VudHJ5Vml0ZVBsdWdpbiB9IGZyb20gJ0BzZW50cnkvdml0ZS1wbHVnaW4nO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBWaXRlSW1hZ2VPcHRpbWl6ZXIgfSBmcm9tICd2aXRlLXBsdWdpbi1pbWFnZS1vcHRpbWl6ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBzZXJ2ZXI6IHtcbiAgICBob3N0OiAnOjonLFxuICAgIHBvcnQ6IDMwMDAsXG4gICAgcHJveHk6IHtcbiAgICAgICcvYXBwJzoge1xuICAgICAgICB0YXJnZXQ6ICdodHRwOi8vbG9jYWxob3N0OjMwMDInLFxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gICAgaGVhZGVyczoge1xuICAgICAgJ1gtRnJhbWUtT3B0aW9ucyc6ICdERU5ZJyxcbiAgICAgICdYLUNvbnRlbnQtVHlwZS1PcHRpb25zJzogJ25vc25pZmYnLFxuICAgICAgJ1JlZmVycmVyLVBvbGljeSc6ICdzdHJpY3Qtb3JpZ2luLXdoZW4tY3Jvc3Mtb3JpZ2luJyxcbiAgICAgICdYLVhTUy1Qcm90ZWN0aW9uJzogJzE7IG1vZGU9YmxvY2snLFxuICAgICAgJ1Blcm1pc3Npb25zLVBvbGljeSc6ICdjYW1lcmE9KCksIG1pY3JvcGhvbmU9KCksIGdlb2xvY2F0aW9uPSgpJyxcbiAgICB9LFxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIFZpdGVJbWFnZU9wdGltaXplcih7XG4gICAgICBqcGc6IHsgcXVhbGl0eTogODUgfSxcbiAgICAgIGpwZWc6IHsgcXVhbGl0eTogODUgfSxcbiAgICAgIHBuZzogeyBxdWFsaXR5OiA4NSB9LFxuICAgICAgd2VicDogeyBxdWFsaXR5OiA4NSB9LFxuICAgICAgc3ZnOiB7XG4gICAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgICB7IG5hbWU6ICdyZW1vdmVWaWV3Qm94JywgYWN0aXZlOiBmYWxzZSB9LFxuICAgICAgICAgIHsgbmFtZTogJ3JlbW92ZUVtcHR5QXR0cnMnLCBhY3RpdmU6IGZhbHNlIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgIH0pIGFzIGFueSxcbiAgICBzZW50cnlWaXRlUGx1Z2luKHtcbiAgICAgIG9yZzogJ3NtZWprYWwtZGVzaWduJyxcbiAgICAgIHByb2plY3Q6ICdqYXZhc2NyaXB0LW5leHRqcycsXG4gICAgICAvLyBPbmx5IHVwbG9hZCBzb3VyY2UgbWFwcyB3aGVuIFNFTlRSWV9BVVRIX1RPS0VOIGlzIHNldCAoQ0kvVmVyY2VsKVxuICAgICAgZGlzYWJsZTogIXByb2Nlc3MuZW52LlNFTlRSWV9BVVRIX1RPS0VOLFxuICAgIH0pLFxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXG4gICAgfSxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICBvdXREaXI6ICdkaXN0JyxcbiAgICBhc3NldHNJbmxpbmVMaW1pdDogNDA5NixcbiAgICBzb3VyY2VtYXA6IHRydWUsXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNlYsU0FBUyxvQkFBb0I7QUFDMVgsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsd0JBQXdCO0FBQ2pDLE9BQU8sVUFBVTtBQUNqQixTQUFTLDBCQUEwQjtBQUpuQyxJQUFNLG1DQUFtQztBQU16QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsUUFDTixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsTUFDaEI7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxtQkFBbUI7QUFBQSxNQUNuQiwwQkFBMEI7QUFBQSxNQUMxQixtQkFBbUI7QUFBQSxNQUNuQixvQkFBb0I7QUFBQSxNQUNwQixzQkFBc0I7QUFBQSxJQUN4QjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQTtBQUFBLElBRU4sbUJBQW1CO0FBQUEsTUFDakIsS0FBSyxFQUFFLFNBQVMsR0FBRztBQUFBLE1BQ25CLE1BQU0sRUFBRSxTQUFTLEdBQUc7QUFBQSxNQUNwQixLQUFLLEVBQUUsU0FBUyxHQUFHO0FBQUEsTUFDbkIsTUFBTSxFQUFFLFNBQVMsR0FBRztBQUFBLE1BQ3BCLEtBQUs7QUFBQSxRQUNILFNBQVM7QUFBQSxVQUNQLEVBQUUsTUFBTSxpQkFBaUIsUUFBUSxNQUFNO0FBQUEsVUFDdkMsRUFBRSxNQUFNLG9CQUFvQixRQUFRLE1BQU07QUFBQSxRQUM1QztBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELGlCQUFpQjtBQUFBLE1BQ2YsS0FBSztBQUFBLE1BQ0wsU0FBUztBQUFBO0FBQUEsTUFFVCxTQUFTLENBQUMsUUFBUSxJQUFJO0FBQUEsSUFDeEIsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLG1CQUFtQjtBQUFBLElBQ25CLFdBQVc7QUFBQSxFQUNiO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
