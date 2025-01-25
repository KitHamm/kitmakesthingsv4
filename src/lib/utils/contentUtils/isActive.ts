const isActive = (href: string, pathname: string) => {
	if (href === "/dashboard") {
		return pathname === "/dashboard";
	}
	return pathname.includes(href);
};

export default isActive;
