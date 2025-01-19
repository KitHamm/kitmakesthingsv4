const socialLinkData = [
	{ href: "https://github.com/KitHamm/", icon: "fa-brands fa-github" },
	{
		href: "https://www.instagram.com/kit_makes_things/",
		icon: "fa-brands fa-instagram",
	},
	{
		href: "https://www.linkedin.com/in/kit-hamm/",
		icon: "fa-brands fa-linkedin",
	},
];

export const socialLinks: { href: string; icon: string }[] = socialLinkData.map(
	({ href, icon }) => ({
		href,
		icon,
	})
);
