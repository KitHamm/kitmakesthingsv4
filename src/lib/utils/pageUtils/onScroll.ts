import { mapNumRange } from "../mathUtils/mapNumberRange";

export function onScroll(container: HTMLDivElement, image: HTMLImageElement) {
	image.classList.replace("opacity-0", "fade-in");
	const containerHeight = container.offsetHeight;
	const imageHeight = image.offsetHeight;
	const newContainerHeight = (imageHeight / 8) * 6;
	let newParallaxValue = 0;
	// setContainerHeight((imageHeight / 8) * 6);
	if (
		image.getBoundingClientRect().top < window.innerHeight &&
		image.getBoundingClientRect().top > 0 - containerHeight
	) {
		newParallaxValue =
			0 -
			mapNumRange(
				image.getBoundingClientRect().top,
				window.innerHeight,
				0,
				imageHeight - containerHeight,
				0
			);
		// setParallaxValue(
		//     0 -
		//         mapNumRange(
		//             headerImageContainer.current.getBoundingClientRect()
		//                 .top,
		//             window.innerHeight,
		//             0,
		//             imageHeight - containerHeight,
		//             0
		//         )
		// );
	}
	return { newContainerHeight, newParallaxValue };
}
