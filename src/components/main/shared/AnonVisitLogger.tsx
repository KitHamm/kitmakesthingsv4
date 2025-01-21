"use client";

// Functions
import { useEffect } from "react";
import { serviceRequest } from "@/server/serviceActions/serviceRequest";

export default function AnonVisitLogger() {
	useEffect(() => {
		const userAgent = navigator.userAgent;
		const botDetected = /bot|googlebot|crawler|spider|robot|crawling/i.test(
			userAgent
		);
		if (!botDetected) {
			console.log("Create request");
			serviceRequest(window.location.pathname);
		} else {
			console.log("Bot detected");
		}
	}, []);

	return <></>;
}
