export default async function AdminLoginPage() {
    return (
        <main>
            <h3>Login</h3>
            <div>
                <form action="/api/admin/login" method="POST">
                    <input
                        name="password"
                        type="password"
                        placeholder="Admin password"
                    />
                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        </main>
    );
}
