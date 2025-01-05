import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");
const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				"charcoal-dark": "#2D2D2D",
				"cloud-white": "#F3F3F3",
				"cyber-green": "#00E676",
				"vibrant-green": "#3CB371", // Brighter green for accents
				"mint-green": "#A0D9B5", // Lighter green for secondary highlights
				"light-gray": "#B0B0B0", // Lighter gray for text
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			boxShadow: {
				"1up": "0 -1px 3px 0 rgb(0 0 0 / 0.1), 0 -1px 2px -1px rgb(0 0 0 / 0.1)",
			},
			dropShadow: {
				"3xl": "0 0 20px rgba(0, 0, 0, 1)",
			},
		},
		screens: {
			sm: "640px",
			// => @media (min-width: 640px) { ... }

			md: "768px",
			// => @media (min-width: 768px) { ... }

			lg: "1025px",
			// => @media (min-width: 1024px) { ... }

			xl: "1450px",
			// => @media (min-width: 1280px) { ... }

			xxl: "1921px",
			// => @media (min-width: 1536px) { ... }
		},
	},
	darkMode: "class",
	plugins: [nextui()],
};
export default config;
