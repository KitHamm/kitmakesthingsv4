"use client";
// packages
import Link from "next/link";
import { Badge } from "@nextui-org/react";
import { usePathname } from "next/navigation";
// functions
import isActive from "@/lib/utils/contentUtils/isActive";

const NavLink = ({
	href,
	label,
	icon,
	newMessages,
	classNames,
	activeClassNames,
}: Readonly<{
	href: string;
	label: string;
	icon?: string;
	newMessages: number;
	classNames?: string;
	activeClassNames?: string;
}>) => {
	const pathname = usePathname();

	return (
		<Link
			className={`${
				isActive(href, pathname) ? activeClassNames : ""
			} flex gap-3 items-center ${classNames}`}
			color="foreground"
			href={href}
		>
			{label === "Messages" ? (
				<>
					<i className={icon} />
					<Badge
						classNames={{ badge: "-right-1 top-" }}
						showOutline={false}
						isInvisible={newMessages === 0}
						placement="top-right"
						content={newMessages}
						color="danger"
					>
						<div className="font-bold">{label}</div>
					</Badge>
				</>
			) : (
				<>
					{icon && <i className={icon} />}
					<div className="font-bold">{label}</div>
				</>
			)}
		</Link>
	);
};

export default NavLink;
