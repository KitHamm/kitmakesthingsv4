import { socialLinks } from "@/data/socials";
import Link from "next/link";

export default function SocialLinks() {
	return (
		<div className="flex flex gap-4">
			{socialLinks.map(({ href, icon }) => (
				<div key={href} className="flex items-center">
					<Link target="_blank" rel="noreferrer" href={href}>
						<i
							aria-hidden
							className={`transition-colors text-black hover:text-green-600 ${icon} fa-2xl`}
						/>
					</Link>
				</div>
			))}
		</div>
	);
}
