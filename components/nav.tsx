"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <nav>
            <div>
                <div>
                    <Link href="/">
                        <div>
                            <Image
                                src="/img/logo-64x64.png"
                                alt="The AI Quill logo"
                                width={50}
                                height={50}
                            ></Image>
                        </div>
                    </Link>
                </div>
                <Image
                    src={open ? "/img/close.svg" : "/img/menu.svg"}
                    alt={open ? "Close navigation" : "Open navigation"}
                    width={50}
                    height={50}
                    onClick={() => setOpen(!open)}
                ></Image>
            </div>
            {open && (
                <div>
                    <a href="/article/random">
                        <div>
                            <p>Random article</p>
                        </div>
                    </a>
                    <Link href="/suggest">
                        <div>
                            <p>Suggest</p>
                        </div>
                    </Link>
                    <Link href="/about">
                        <div>
                            <p>About</p>
                        </div>
                    </Link>
                    <Link href="/theme">
                        <div>
                            <p>Theme</p>
                        </div>
                    </Link>
                </div>
            )}
        </nav>
    );
}
