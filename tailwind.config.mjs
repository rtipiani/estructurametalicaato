/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: '#70d959',
				secondary: '#4cae36',
				custom: '#2f7d1e',
			}
		},
	},
	plugins: [],
}
