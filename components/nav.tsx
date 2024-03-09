"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./nav.module.css";

export default function Navigation() {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <nav className={styles.nav}>
                <header>
                    <div className={styles.logoContainer}>
                        <div className={styles.logo}>
                            <Link href="/" onClick={() => setOpen(false)}>
                                <Image
                                    src="/img/logo-64x64.png"
                                    alt="The AI Quill logo"
                                    width={50}
                                    height={50}
                                ></Image>
                            </Link>
                        </div>
                        <p className="desktop">The AIQuill</p>
                    </div>

                    <p className="mobile">The AIQuill</p>

                    <div className={styles.hamburger}>
                        <Image
                            src={open ? "/img/close.svg" : "/img/menu.svg"}
                            alt={open ? "Close navigation" : "Open navigation"}
                            width={50}
                            height={50}
                            onClick={() => setOpen(!open)}
                        ></Image>
                    </div>
                </header>
                {open && (
                    <menu className={styles.dropout}>
                        <li>
                            <a
                                href="/article/random"
                                onClick={() => setOpen(false)}
                            >
                                Random article
                            </a>
                        </li>
                        <li>
                            <Link
                                href="/suggest"
                                onClick={() => setOpen(false)}
                            >
                                Suggest
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" onClick={() => setOpen(false)}>
                                About
                            </Link>
                        </li>
                        <li>
                            <Link href="/theme" onClick={() => setOpen(false)}>
                                Theme
                            </Link>
                        </li>
                    </menu>
                )}
            </nav>
            {open && <div className={styles.backdrop}></div>}
        </>
    );
}
