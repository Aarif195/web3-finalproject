import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Fix ethers/browser buffer issue
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['ethers', '@metamask/detect-provider']
  },
  define: {
    global: {}, // prevent buffer error
  },
});
