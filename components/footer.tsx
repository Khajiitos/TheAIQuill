import Image from "next/image";
import Link from "next/link";

export default async function Footer() {
	return (
        <footer className="bg-green-600 text-white relative bottom-0 left-0 right-0 w-screen p-3 shadow-md mt-10">
            <p className="text-sm text-gray-300 text-center">Made with <Image src="/img/heart.svg" alt="love" width={16} title="love" height={16} className="inline"></Image> and <Image src="/img/chatgpt.svg" alt="ChatGPT" title="ChatGPT" width={18} height={18} className="inline"></Image> by <Link href="https://github.com/Khajiitos">Khajiitos</Link></p>
            <p className="text-sm text-gray-300 text-center">Content generated by AI, don&apos;t take everything seriously!</p>
        </footer>
	);
}