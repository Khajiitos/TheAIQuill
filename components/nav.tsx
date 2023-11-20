import Image from "next/image";
import Link from "next/link";

export default function Navigation() {
	return (
		<nav className="m-0 shadow-md">
            <div className="bg-green-600 container-none text-white flex justify-between">
				<div className="space-between">
					<Link href="/">
						<div className="bg-green-800 hover:bg-green-700 p-3 shadow-md transition-colors">
							<Image src="/img/download(3).svg" alt="The AI Quill logo" width={121} height={53}></Image>
						</div>
					</Link>
				</div>
				<div className="flex">
					<Link href="/article/random" prefetch={false}>
						<div className="bg-green-800 hover:bg-green-700 p-3 shadow-md transition-colors h-full text-xl flex justify-center items-center">
							<p>Random article</p>
						</div>
					</Link>
					<Link href="/suggest">
						<div className="bg-green-800 hover:bg-green-700 p-3 shadow-md transition-colors h-full text-xl flex justify-center items-center">
							<p>Suggest</p>
						</div>
					</Link>
					<Link href="/about">
						<div className="bg-green-800 hover:bg-green-700 p-3 shadow-md transition-colors h-full text-xl flex justify-center items-center">
							<p>About</p>
						</div>
					</Link>
				</div>
            </div>
		</nav>
	);
}