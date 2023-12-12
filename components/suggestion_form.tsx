'use client'

import { FormEvent } from "react";

const regex = /^.{4,100}$/;

export default function SuggestionForm() {
    function onSubmit(e : FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const target = e.target as typeof e.target & {
            tag: { value: string };
        };

        const tag: string = target.tag.value;
        console.log(tag);

        const errorParagraph = document.getElementById('error') as HTMLParagraphElement;
        const messageParagraph = document.getElementById('message') as HTMLParagraphElement;

        if (regex.test(tag)) {
            errorParagraph.innerText = '';

            fetch('/api/suggest', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({suggestion: tag})
            })
            .then(res => res.json())
            .then(res => {
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
            errorParagraph.innerText = 'Invalid tag!';
        }
    }

	return (
        <form className="mt-2" onSubmit={onSubmit}>
          <input className="rounded-full shadow text-black p-2 w-56 bg-secondary" type="text" name="tag" maxLength={32} placeholder="Suggestion..."/>
          <p><button type="submit" className="w-56 p-2 bg-green-800 mt-5 mb-5 rounded-lg hover:bg-green-700 transition-colors">Submit idea suggestion</button></p>

          <p className="text-red-500 font-semibold" id="error"></p>
          <p className="font-semibold" id="message"></p>
        </form>
	);
}