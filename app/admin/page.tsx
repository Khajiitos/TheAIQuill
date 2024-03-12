import { cookies } from "next/headers";
import { getSessionData } from "@/lib/session";
import { redirect } from "@/node_modules/next/navigation";
import styles from "./page.module.css";

export default async function AdminPage() {
    const session = await getSessionData(cookies());

    if (!session.loggedIn) {
        return redirect("/admin/login");
    }

    return (
        <main className={styles.main}>
            <h1>Latest articles</h1>
        </main>
    );
}
