import Login from "@/components/Login";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/authOptions";
export default async function Account() {
    const session = await getServerSession(authOptions);
    return (
        <main className="flex flex-col w-screen min-h-screen">
            <Login />
        </main>
    );
}
