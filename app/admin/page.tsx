import { cookies } from "next/headers";
import { getSessionData } from "@/lib/session";
import { redirect } from "@/node_modules/next/navigation";

export default async function AdminPage() {
    const session = await getSessionData(cookies());

    if (!session.loggedIn) {
        return redirect("/admin/login");
    }

    return (
        <main>
            <h3>Latest articles</h3>

            <div></div>
        </main>
    );
}
