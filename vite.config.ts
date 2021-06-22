import path from 'path';
import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import svgr from 'vite-plugin-svgr';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [reactRefresh(), VitePWA(), svgr()],
	esbuild: {
		jsxInject: `import React from "react"`,
	},
	resolve: {
		alias: {
			src: path.resolve(__dirname, './src/'),
		},
	},
});
