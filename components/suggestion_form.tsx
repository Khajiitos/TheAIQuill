"use client";
import { FormEvent } from "react";
import styles from "./suggestion_form.module.css";

const regex = /^.{4,100}$/;

export default function SuggestionForm() {
    function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const target = e.target as typeof e.target & {
            tag: { value: string };
        };

        const tag: string = target.tag.value;
        console.log(tag);

        const errorParagraph = document.getElementById(
            "error"
        ) as HTMLParagraphElement;
        const messageParagraph = document.getElementById(
            "message"
        ) as HTMLParagraphElement;

        if (regex.test(tag)) {
            errorParagraph.innerText = "";

            fetch("/api/suggest", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ suggestion: tag }),
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
        } else {
            errorParagraph.innerText = "Invalid tag!";
        }
    }

    return (
        <form onSubmit={onSubmit} className={styles.form}>
            <div>
                <h2>Your article suggestion</h2>

                <small id="error"></small>
                <small id="message"></small>

                <input
                    type="text"
                    name="tag"
                    maxLength={100}
                    placeholder="Suggestion..."
                />

                <button type="submit">Submit idea suggestion</button>
            </div>
        </form>
    );
}
