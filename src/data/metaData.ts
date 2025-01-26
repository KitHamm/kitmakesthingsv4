import type { Metadata } from "next";

export const getMetaData = (title: string) => {
	const url =
		process.env.NODE_ENV === "production"
			? process.env.NEXT_PUBLIC_BASE_URL ||
			  "https://kitmakesthings.co.uk/"
			: "https://kitmakesthings.co.uk/";
	const description =
		"Kit Hamm is a Freelance Developer from the South West. Open to contract and full time opportunities.";

	const metadata: Metadata = {
		metadataBase: new URL(url),
		title: title,
		description: description,
		openGraph: {
			title: title,
			description: description,
			url: url,
			siteName: "KitMakesThings",
			locale: "en-US",
			type: "website",
			images: [
				{
					url: "/open_graph.png",
					width: 400,
					height: 200,
					alt: "KitMakeThings",
				},
			],
		},
	};
	return metadata;
};
