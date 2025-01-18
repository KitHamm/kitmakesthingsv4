"use client";

import { Select, SelectItem } from "@nextui-org/react";
import { SetStateAction } from "react";

export default function ImagePerPageSelect(
	props: Readonly<{
		imagesPerPage: number;
		setImagesPerPage: (value: SetStateAction<number>) => void;
	}>
) {
	const { imagesPerPage, setImagesPerPage } = props;
	return (
		<Select
			className="ms-auto me-auto xl:me-0"
			variant="bordered"
			selectedKeys={[imagesPerPage.toString()]}
			labelPlacement="outside"
			label={"Images Per Page"}
			onChange={(e) => setImagesPerPage(parseInt(e.target.value))}
		>
			<SelectItem className="light" key={4} value={4}>
				4
			</SelectItem>
			<SelectItem className="light" key={8} value={8}>
				8
			</SelectItem>
			<SelectItem className="light" key={12} value={12}>
				12
			</SelectItem>
			<SelectItem className="light" key={16} value={16}>
				16
			</SelectItem>
			<SelectItem className="light" key={20} value={20}>
				20
			</SelectItem>
			<SelectItem className="light" key={1000000} value={1000000}>
				All
			</SelectItem>
		</Select>
	);
}
