import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "KitMakesThings",
        short_name: "Next.js App",
        description:
            "Kit Hamm is a Web and Unity Developer from the South West. Open to contract and full time opportunities.",
        start_url: "/",
        display: "standalone",
        background_color: "#fff",
        theme_color: "#fff",
        icons: [
            {
                src: "/favicon.ico",
                sizes: "any",
                type: "image/x-icon",
            },
        ],
    };
}
