"use client";

import { Select, SelectItem } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";

const ImageOrderBySelect = ({
	orderBy,
	setOrderBy,
}: Readonly<{
	orderBy: string;
	setOrderBy: Dispatch<SetStateAction<"asc" | "desc">>;
}>) => {
	return (
		<Select
			className="ms-auto me-auto xl:me-0"
			variant="bordered"
			selectedKeys={[orderBy]}
			labelPlacement="outside"
			label={"Order"}
			onChange={(e) => {
				e.target.value === "asc"
					? setOrderBy("asc")
					: setOrderBy("desc");
			}}
		>
			<SelectItem className="light" key={"asc"} value={"asc"}>
				Ascending
			</SelectItem>
			<SelectItem className="light" key={"desc"} value={"desc"}>
				Descending
			</SelectItem>
		</Select>
	);
};

export default ImageOrderBySelect;
