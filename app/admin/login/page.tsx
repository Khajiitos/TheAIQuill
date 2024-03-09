import styles from "./page.module.css";

export default async function AdminLoginPage() {
    return (
        <main className={styles.main}>
            <div className={styles.form}>
                <h1>Login</h1>
                <form action="/api/admin/login" method="POST">
                    <input
                        name="password"
                        type="password"
                        placeholder="Admin password"
                    />

                    <button type="submit">Login</button>
                </form>
            </div>
        </main>
    );
}
