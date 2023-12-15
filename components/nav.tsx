'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
	const [open, setOpen] = useState<boolean>(false);

	return (
		<nav className="top-0 fixed w-full bg-background">
            <div className="container-none text-text flex justify-between border-b-4 border-entry">
				<div className="space-between">
					<Link href="/">
						<div className="p-3">
							<Image src="/img/logo-64x64.png" alt="The AI Quill logo" width={50} height={50}></Image>
						</div>
					</Link>
				</div>
				<Image src={open ? "/img/close.svg" : "/img/menu.svg"} alt={open ? "Close navigation" : "Open navigation"} width={50} height={50} onClick={() => setOpen(!open)} className="mr-6 cursor-pointer"></Image>
            </div>
			{open &&
			<div className="text-text absolute w-full bg-background-lighter overflow-hidden shadow-xl">
				<a href="/article/random">
					<div className="border-b-4 border-entry p-3 transition-colors h-full text-xl flex justify-center items-center">
						<p>Random article</p>
					</div>
				</a>
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
				<Link href="/theme">
					<div className="border-b-4 border-entry p-3 transition-colors h-full text-xl flex justify-center items-center">
						<p>Theme</p>
					</div>
				</Link>
			</div>
			}
		</nav>
	);
}