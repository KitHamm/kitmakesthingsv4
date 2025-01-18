"use client";

import { Select, SelectItem } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";

export default function ImageSortBySelect(
	props: Readonly<{
		sortBy: string;
		setSortBy: Dispatch<SetStateAction<"name" | "date">>;
	}>
) {
	const { sortBy, setSortBy } = props;
	return (
		<Select
			className="ms-auto me-auto xl:me-0"
			variant="bordered"
			selectedKeys={[sortBy]}
			labelPlacement="outside"
			label={"Sort by"}
			onChange={(e) => {
				e.target.value === "date"
					? setSortBy("date")
					: setSortBy("name");
			}}
		>
			<SelectItem className="light" key={"date"} value={"date"}>
				Date
			</SelectItem>
			<SelectItem className="light" key={"name"} value={"name"}>
				Name
			</SelectItem>
		</Select>
	);
}
