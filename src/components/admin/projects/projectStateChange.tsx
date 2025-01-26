"use client";
// packages
import { Select, SelectItem, SharedSelection } from "@nextui-org/react";
// functions
import { updateProjectState } from "@/server/projectTrackerActions/updateProjectState";
// types
import { ProjectState } from "@prisma/client";

const StateSelection = [
	{ key: "PROPOSED", label: "Proposed" },
	{ key: "STARTED", label: "Started" },
	{ key: "FINISHED", label: "Finished" },
];

const ProjectStateChange = ({
	state,
	id,
}: Readonly<{
	state: ProjectState;
	id: string;
}>) => {
	const handleChange = async (e: SharedSelection) => {
		if (!e.anchorKey || !Object.keys(ProjectState).includes(e.anchorKey))
			return;

		try {
			const projectState =
				ProjectState[e.anchorKey as keyof typeof ProjectState];
			const res = await updateProjectState(id, projectState);
			if (!res.success) {
				console.log("Error:", res.error);
			}
		} catch (error) {
			console.log("Unexpected error:", error);
		}
	};

	return (
		<div className="w-52 my-auto">
			<Select
				aria-label="project state"
				size="lg"
				variant="bordered"
				placeholder="Project State"
				selectedKeys={new Set([state])}
				defaultSelectedKeys={StateSelection[0].key}
				className="max-w-xs"
				onSelectionChange={(e) => handleChange(e)}
			>
				{StateSelection.map((state) => (
					<SelectItem key={state.key}>{state.label}</SelectItem>
				))}
			</Select>
		</div>
	);
};

export default ProjectStateChange;
