'use client'

import { FormEvent } from "react";

export default function SuggestionPersonalityForm(props: {options: string[]}) {

    function onSubmitPersonality(e : FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const target = e.target as typeof e.target & {
            personality: { selectedIndex: number };
        };

        const index: number = target.personality.selectedIndex;
        console.log(index);

        const errorParagraph = document.getElementById('error-personality') as HTMLParagraphElement;
        const messageParagraph = document.getElementById('message-personality') as HTMLParagraphElement;

        fetch('/api/suggest/personality', {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({personalityId: index})
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
    }

	return (
        <form className="mt-2" onSubmit={onSubmitPersonality}>
          <select name="personality" className="p-3 rounded text-black w-72">
            {props.options.map(personality => (
              <option key={personality}>{personality}</option>
            ))}
          </select>
          <p><button type="submit" className="w-72 p-2 bg-green-800 mt-5 mb-5 rounded-lg hover:bg-green-700 transition-colors">Submit personality suggestion</button></p>

          <p className="text-red-500 font-semibold" id="error-personality"></p>
          <p className="font-semibold" id="message-personality"></p>
        </form>
	);
}