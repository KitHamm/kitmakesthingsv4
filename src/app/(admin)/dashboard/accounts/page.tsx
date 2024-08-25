import { authOptions } from "@/authOptions";
import AccountsMain from "@/components/admin/accounts/AccountsMain";
import { getServerSession } from "next-auth";

export default function Accounts() {
    const session = getServerSession(authOptions);

    return (
        <div className="xl:py-10 xl:px-10 py-4 px-4">
            <AccountsMain />
        </div>
    );
}
