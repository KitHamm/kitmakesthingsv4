import { LogoList } from "@/lib/types";

// Array of logo names and their corresponding URLs
const logoData = [
	{ name: "NextJs", url: "nextdotjs.svg" },
	{ name: "TypeScript", url: "typescript.svg" },
	{ name: "ReactJs", url: "react.svg" },
	{ name: "Prisma", url: "prisma.svg" },
	{ name: "GraphQL", url: "graphql.svg" },
	{ name: "Postgres", url: "postgresql.svg" },
	{ name: "Tailwind", url: "tailwindcss.svg" },
	{ name: "Sass", url: "sass.svg" },
	{ name: "Unity", url: "unity.svg" },
	{ name: "GitHub", url: "github.svg" },
	{ name: "Digital Ocean", url: "digitalocean.svg" },
	{ name: "Docker", url: "docker.svg" },
	{ name: "Photoshop", url: "adobephotoshop.svg" },
	{ name: "Davinci Resolve", url: "davinciresolve.svg" },
	{ name: "Blender", url: "blender.svg" },
	{ name: "Figma", url: "figma.svg" },
];

// Map the array to the LogoList type
export const techLogos: LogoList[] = logoData.map(({ name, url }) => ({
	name,
	url,
}));
