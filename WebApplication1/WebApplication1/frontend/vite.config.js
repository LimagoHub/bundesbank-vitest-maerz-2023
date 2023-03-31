import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
	
	 build: {
  
    outDir: '../wwwroot',
    
  },
   server: {
    proxy: {
      // string shorthand: http://localhost:5173/foo -> http://localhost:4567/foo
      //     '/WeatherForecast': 'https://localhost:7206',
      // with options: http://localhost:5173/api/bar-> http://jsonplaceholder.typicode.com/bar
      '/WeatherForecast': {
        target: 'https://localhost:7206',
          changeOrigin: true,
          secure: false,
          //ws: true,
         //rewrite: (path) => path.replace(/^\/api/, ''),
      },
      
      
    },
  },
	
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
  
})
