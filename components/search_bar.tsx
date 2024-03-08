"use client";

export default function SearchBar(props: {
    onUpdate: (phrase: string) => void;
}) {
    return (
        <input
            type="text"
            autoComplete="false"
            onChange={(e) => props.onUpdate(e.target.value)}
            placeholder="Search..."
            enterKeyHint="search"
        />
    );
}
