import { Select, SelectItem } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";

const perPageOptions = [
	{ key: "4", value: 4 },
	{ key: "8", value: 8 },
	{ key: "12", value: 12 },
	{ key: "16", value: 16 },
	{ key: "20", value: 20 },
	{ key: "All", value: 999999 },
];

const ImagesPerPageSelect = ({
	imagesPerPage,
	setImagesPerPage,
}: Readonly<{
	imagesPerPage: number;
	setImagesPerPage: Dispatch<SetStateAction<number>>;
}>) => {
	return (
		<Select
			className="ms-auto me-auto xl:me-0"
			variant="bordered"
			selectedKeys={[imagesPerPage.toString()]}
			labelPlacement="outside"
			label={"Images Per Page"}
			onChange={(e) => setImagesPerPage(parseInt(e.target.value))}
		>
			{perPageOptions.map((item) => (
				<SelectItem className="light" key={item.key} value={item.value}>
					{item.key}
				</SelectItem>
			))}
		</Select>
	);
};

export default ImagesPerPageSelect;
