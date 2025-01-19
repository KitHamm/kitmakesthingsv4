"use client";

// Functions
import { useEffect } from "react";
import { serviceRequest } from "@/server/serviceActions/serviceRequest";

export default function AnonVisitLogger() {
	useEffect(() => {
		serviceRequest(window.location.pathname);
	}, []);

	return <></>;
}
