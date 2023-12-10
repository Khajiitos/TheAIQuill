import Link from "next/link";

export default async function AboutPage() {
  return (
    <main className="mt-3 text-text p-8">
        <h1 className="text-6xl font-bold text-center mb-6">About</h1>
        <p>This website is a blog written entirely by our good friend GPT-3.5-Turbo.</p>
        <p>New articles appear about every 2 hours (sometimes they don&apos;t, because OpenAI might send the response in an invalid format 🤣)</p>
        <p className="mt-8">Made by <Link className="text-accent underline" href="https://github.com/Khajiitos">Khajiitos</Link> <Link className="text-accent underline" href="https://khajiitos.fun">(personal website)</Link></p>
        <p className="mt-1">Designed by <Link className="text-accent underline" href="https://github.com/sutaC">sutaC</Link></p>
    </main>
  )
}