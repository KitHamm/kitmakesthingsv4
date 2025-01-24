export const isImages = (files: FileList) => {
	for (const file of files) {
		if (file.type.split("/")[0] !== "image") {
			return false;
		}
	}
	return true;
};
