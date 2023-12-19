'use client'
import Image from "next/image";
import Link from "next/link";

export default function SearchBar(props: {onUpdate: (phrase: string) => void}) {
	return (
        <input className="bg-background-lighter rounded-lg p-4 border bg-accent w-96" type="text" autoComplete="false" onChange={e => props.onUpdate(e.target.value)} placeholder="Search..." enterKeyHint="search"/>
	);
}