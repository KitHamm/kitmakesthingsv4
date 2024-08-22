"use client";

import { useEffect } from "react";
import { Request } from "./actions/ServiceActions";
import { Session } from "next-auth";

export default function ProjectsContent(props: { session: Session }) {
    useEffect(() => {
        ServiceRequest();
    }, []);

    async function ServiceRequest() {
        if (!props.session) {
            await Request(window.location.pathname);
        }
    }
    return <></>;
}
