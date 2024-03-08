import Image from "next/image";
import Link from "next/link";

export default async function AboutPage() {
    return (
        <main>
            <div>
                <p>The AI Quill</p>
                <Image
                    src="/img/logo-512x512.png"
                    alt="The AI Quill logo"
                    width={128}
                    height={128}
                />
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
                <Link href="https://github.com/Khajiitos/TheAIQuill/">
                    here
                </Link>
                .
            </p>
            <p>
                Made by{" "}
                <Link href="https://github.com/Khajiitos">Khajiitos</Link>{" "}
                <Link href="https://khajiitos.fun">(personal website)</Link>
            </p>
            <p className="mt-1">
                Designed by <Link href="https://github.com/sutaC">sutaC</Link>
            </p>
        </main>
    );
}
