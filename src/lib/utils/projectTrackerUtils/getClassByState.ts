import { ProjectState } from "@prisma/client";

export const getProjectStateClass = (state: ProjectState) => {
	if (state === ProjectState.PROPOSED) {
		return "text-neutral-600";
	} else if (state === ProjectState.STARTED) {
		return "text-orange-400";
	} else {
		return "text-green-400";
	}
};
