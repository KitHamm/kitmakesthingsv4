"use client";

import { updateProjectState } from "@/server/projectTrackerActions/updateProjectState";
import { Select, SelectItem, SharedSelection } from "@nextui-org/react";
import { ProjectState } from "@prisma/client";
import { useState } from "react";

const StateSelection = [
	{ key: "PROPOSED", label: "Proposed" },
	{ key: "STARTED", label: "Started" },
	{ key: "FINISHED", label: "Finished" },
];

export default function ProjectStateChange(
	props: Readonly<{
		state: ProjectState;
		id: string;
	}>
) {
	const [value, setValue] = useState(new Set([props.state]));

	function handleChange(e: SharedSelection) {
		if (!e.anchorKey || !Object.keys(ProjectState).includes(e.anchorKey))
			return;

		const projectState =
			ProjectState[e.anchorKey as keyof typeof ProjectState];

		setValue(new Set([projectState]));
		updateProjectState(props.id, projectState)
			.then((res) => {
				if (res.status === 400) console.log(res.message);
			})
			.catch((err) => console.log(err));
	}

	return (
		<div className="w-52 my-auto">
			<Select
				aria-label="project state"
				size="lg"
				variant="bordered"
				placeholder="Project State"
				selectedKeys={value}
				defaultSelectedKeys={"PROPOSED"}
				className="max-w-xs"
				onSelectionChange={(e) => handleChange(e)}
			>
				{StateSelection.map((state) => (
					<SelectItem key={state.key}>{state.label}</SelectItem>
				))}
			</Select>
		</div>
	);
}
