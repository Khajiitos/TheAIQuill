"use client";
import { FormEvent } from "react";
import styles from "./suggestion_personality_form.module.css";

export default function SuggestionPersonalityForm(props: {
    options: string[];
}) {
    function onSubmitPersonality(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const target = e.target as typeof e.target & {
            personality: { selectedIndex: number };
        };

        const index: number = target.personality.selectedIndex;
        console.log(index);

        const errorParagraph = document.getElementById(
            "error-personality"
        ) as HTMLParagraphElement;
        const messageParagraph = document.getElementById(
            "message-personality"
        ) as HTMLParagraphElement;

        fetch("/api/suggest/personality", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ personalityId: index }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    errorParagraph.innerText = res.error;
                } else if (res.message) {
                    messageParagraph.innerText = res.message;
                }
            })
            .catch((e: Error) => {
                errorParagraph.innerText = e.message;
            });
    }

    return (
        <form onSubmit={onSubmitPersonality} className={styles.form}>
            <div>
                <h2>Your AI personality suggestion</h2>

                <small id="error-personality"></small>
                <small id="message-personality"></small>

                <select name="personality">
                    {props.options.map((personality) => (
                        <option key={personality}>{personality}</option>
                    ))}
                </select>

                <button type="submit">Submit personality suggestion</button>
            </div>
        </form>
    );
}
