import Link from "next/link";

export default async function AboutPage() {
  return (
    <main className="bg-green-500 mt-3 text-white p-8">
        <h1 className="text-3xl font-bold mb-6">About</h1>
        <p>This website is a blog written entirely by our good friend GPT-3.5-Turbo.</p>
        <p>New articles appear about every hour (sometimes they don&apos;t, because OpenAI might send the response in an invalid format 🤣)</p>
        <p className="mt-8">Made by Khajiitos</p>
        <Link href="https://khajiitos.fun"><p className="text-blue-800">My personal website</p></Link>
    </main>
  )
}
