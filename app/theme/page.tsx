'use client'

import { useEffect, useState } from "react";

export default function ThemePage() {

    const [currentTheme, setCurrentTheme] = useState<string | null>(null);

    useEffect(() => {
        setCurrentTheme(getCookieTheme());
    });

    interface ThemeInfo {
        name: string;
        className: string;
        colorPrimary: string;
        colorAccent?: string;
    }

    const themes: ThemeInfo[] = [
        {
            name: "sutaC",
            className: "theme-sutac",
            colorPrimary: "#0b0c05",
            colorAccent: "#54b856"
        },
        {
            name: "Twilight Serenity",
            className: "theme-twilight-serenity",
            colorPrimary: "#1b1e28",
            colorAccent: "#6e72a4"
        },
        {
            name: "Dark Elegance",
            className: "theme-dark-elegance",
            colorPrimary: "#2c2c2c",
            colorAccent: "#ff6f61"
        },
        {
            name: "Modern Monochrome",
            className: "theme-modern-monochrome",
            colorPrimary: "#2e2e2e",
            colorAccent: "#00bcd4"
        },
        {
            name: "Light Breeze",
            className: "theme-light-breeze",
            colorPrimary: "#ffffff",
            colorAccent: "#81d4fa"
        },
        {
            name: "Frosty Blue",
            className: "theme-frosty-blue",
            colorPrimary: "#1e1e1e",
            colorAccent: "#64b5f6"
        }
    ];

    function getCookieTheme(): string | null {
        const cookies = document.cookie.split(';');
        
        for (const cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
    
            if (name === 'theme') {
                return value;
            }
        }
    
        return null;
    }
     
    function setTheme(theme: ThemeInfo) {
        document.body.classList.forEach(clazz => {
            if (clazz.startsWith('theme-')) {
                document.body.classList.remove(clazz);
            }
        })

        document.body.classList.add(theme.className);
        const expireDate = new Date();
        expireDate.setFullYear(expireDate.getFullYear() + 1);
        document.cookie = `theme=${theme.className}; expires=${expireDate.toUTCString()}; path=/`;
        setCurrentTheme(theme.className);
    }

    return (
        <main className="mt-3 text-text p-8">
            <p className='text-4xl text-center mb-3'>Themes</p>
            <p className='text-2xl text-yellow-500 text-center mb-5'>WIP</p>

            <div>
                {themes.map(theme => (
                    <div key={theme.className} className={`m-4 items-center p-5 cursor-pointer flex ${theme.className === currentTheme ? "bg-background-lighter" : "bg-primary"} rounded-lg`} onClick={_e => setTheme(theme)}>
                        <div className="rounded-full p-10 border-2 border-black" style={{backgroundColor: theme.colorPrimary, borderColor: theme.colorAccent}}></div>
                        <p className="text-2xl ml-6">{theme.name}</p>
                    </div>
                ))}
            </div>
        </main>
    )
}
