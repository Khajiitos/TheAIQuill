'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
	const [open, setOpen] = useState<boolean>(false);

	return (
		<nav className="m-0 sticky">
            <div className="container-none text-text flex justify-between border-b-4 border-entry">
				<div className="space-between">
					<Link href="/">
						<div className="p-3">
							<Image src="/img/logo.svg" alt="The AI Quill logo" width={50} height={50}></Image>
						</div>
					</Link>
				</div>
				<Image src={open ? "/img/close.svg" : "/img/menu.svg"} alt={open ? "Close navigation" : "Open navigation"} width={50} height={50} onClick={() => setOpen(!open)} className="mr-6 cursor-pointer"></Image>
            </div>
			{open &&
			<div className="text-text">
				<Link href="/article/random">
					<div className="border-b-4 border-entry p-3 transition-colors h-full text-xl flex justify-center items-center">
						<p>Random article</p>
					</div>
				</Link>
				<Link href="/suggest">
					<div className="border-b-4 border-entry p-3 transition-colors w-full text-xl flex justify-center items-center">
						<p>Suggest</p>
					</div>
				</Link>
				<Link href="/about">
					<div className="border-b-4 border-entry p-3 transition-colors h-full text-xl flex justify-center items-center">
						<p>About</p>
					</div>
				</Link>
			</div>
			}
		</nav>
	);
}