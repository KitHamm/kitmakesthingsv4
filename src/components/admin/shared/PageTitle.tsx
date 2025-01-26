const PageTitle = ({ title }: Readonly<{ title: string }>) => {
	return (
		<div className="font-bold text-6xl mb-6 pb-4 border-b-2">{title}</div>
	);
};

export default PageTitle;
