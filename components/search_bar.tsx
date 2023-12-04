'use client'
import Image from "next/image";
import Link from "next/link";

export default function SearchBar(props: {onUpdate: (phrase: string) => void}) {
	return (
        <input className="bg-green-800 rounded-lg p-4 border border-green-900 w-96" type="text" onChange={e => props.onUpdate(e.target.value)} placeholder="Search..." enterKeyHint="search"/>
	);
}