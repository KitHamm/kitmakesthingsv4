"use client";

import { useEffect } from "react";
import { Request } from "./actions/ServiceActions";

export default function ProjectsContent() {
    useEffect(() => {
        Request(window.location.pathname);
    }, []);

    return <></>;
}
