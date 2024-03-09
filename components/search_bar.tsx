"use client";
import styles from "./search_bar.module.css";

export default function SearchBar(props: {
    onUpdate: (phrase: string) => void;
}) {
    return (
        <input
            className={styles.search}
            type="text"
            autoComplete="false"
            onChange={(e) => props.onUpdate(e.target.value)}
            placeholder="Search..."
            enterKeyHint="search"
        />
    );
}
