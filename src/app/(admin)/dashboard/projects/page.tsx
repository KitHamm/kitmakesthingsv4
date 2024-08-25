import { authOptions } from "@/authOptions";
import ProjectsMain from "@/components/admin/projects/ProjectsMain";
import { getServerSession } from "next-auth";

export default function Projects() {
    const session = getServerSession(authOptions);

    return (
        <div className="xl:py-10 xl:px-10 py-4 px-4">
            <ProjectsMain />
        </div>
    );
}
