"use client";

import { ContentProject } from "@prisma/client";
import { useEffect } from "react";

export default function ProjectsMain(props: { projects: ContentProject[] }) {
    useEffect(() => {
        console.log(props.projects);
    }, []);

    return <div></div>;
}
