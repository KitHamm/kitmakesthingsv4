"use client";

import { useCallback } from "react";
import type { Engine } from "tsparticles-engine";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";

export default function ParticlesComponent({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const particlesInit = useCallback(async (engine: Engine) => {
		// you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
		// this loads the tsparticles package bundle, it's the easiest method for getting everything ready
		// starting from v2 you can add only the features you need reducing the bundle size
		//await loadFull(engine);
		await loadSlim(engine);
	}, []);

	return (
		<>
			<Particles
				id="tsparticles"
				init={particlesInit}
				options={{
					background: {
						color: {
							value: "#d4d4d4",
						},
					},
					fpsLimit: 120,
					interactivity: {
						detect_on: "canvas",
						events: {
							onhover: {
								enable: true,
								mode: "grab",
							},
							onclick: {
								enable: true,
								mode: "repulse",
							},
							resize: true,
						},
						modes: {
							grab: {
								distance: 200,
								line_linked: {
									opacity: 1,
								},
							},
							bubble: {
								distance: 400,
								size: 40,
								duration: 2,
								opacity: 8,
								speed: 3,
							},
							repulse: {
								distance: 200,
								duration: 0.4,
							},
							push: {
								particles_nb: 4,
							},
							remove: {
								particles_nb: 2,
							},
						},
					},
					particles: {
						number: {
							value: 80,
							density: {
								enable: true,
								value_area: 800,
							},
						},
						color: {
							value: "#ffffff",
						},
						shape: {
							type: "triangle",
							stroke: {
								width: 0,
								color: "#000000",
							},
							polygon: {
								nb_sides: 5,
							},
							image: {
								src: "img/github.svg",
								width: 100,
								height: 100,
							},
						},
						opacity: {
							value: 0.5,
							random: false,
							anim: {
								enable: false,
								speed: 1,
								opacity_min: 0.1,
								sync: false,
							},
						},
						size: {
							value: 3,
							random: true,
							anim: {
								enable: false,
								speed: 40,
								size_min: 0.1,
								sync: false,
							},
						},
						line_linked: {
							enable: true,
							distance: 150,
							color: "#ffffff",
							opacity: 0.4,
							width: 1,
						},
						move: {
							enable: true,
							speed: 1,
							direction: "none",
							random: false,
							straight: false,
							out_mode: "out",
							bounce: false,
							attract: {
								enable: true,
								rotateX: 600,
								rotateY: 1200,
							},
						},
					},
					detectRetina: true,
				}}
			/>
			{children}
		</>
	);
}
