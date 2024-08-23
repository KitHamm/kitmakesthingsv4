"use client";

import { useEffect } from "react";
import { Request } from "./actions/ServiceActions";
import { Session } from "next-auth";

export default function ProjectsContent(props: { session: Session }) {
    useEffect(() => {
        if (!props.session) {
            Request(window.location.pathname);
        }
    }, [props.session]);

    return <></>;
}
