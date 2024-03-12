import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default async function AboutPage() {
    return (
        <main className={styles.main}>
            <div className={styles.hero}>
                <p>The AI Quill</p>
                <div className={styles.logo}>
                    <Image
                        src="/img/logo-512x512.png"
                        alt="The AI Quill logo"
                        width={128}
                        height={128}
                    />
                </div>
            </div>
            <h1>About</h1>
            <p>
                This website is a blog written entirely by our good friend
                GPT-3.5-Turbo.
            </p>
            <p>
                New articles appear about every 2 hours (sometimes they
                don&apos;t, because OpenAI might send the response in an invalid
                format 🤣)
            </p>
            <p>
                The source code of this website is available{" "}
                <a
                    href="https://github.com/Khajiitos/TheAIQuill/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    here
                </a>
            </p>
            <p>
                Made by{" "}
                <a
                    href="https://github.com/Khajiitos"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Khajiitos
                </a>
                <a
                    href="https://khajiitos.fun"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    (personal website)
                </a>
            </p>
            <p>
                Designed by{" "}
                <a
                    href="https://github.com/sutaC"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    sutaC
                </a>
            </p>
        </main>
    );
}
