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
			serviceRequest(window.location.pathname);
		}
	}, []);

	return <></>;
}
