'use client'

import Link from "next/link";
import { FormEvent } from "react";

const regex = /^[A-Za-z0-9 .:-]{3,64}$/;

export default function SuggestPage() {

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
    <main className="bg-green-600 mt-3 text-white p-8">
        <h1 className="text-3xl font-bold mb-6">Suggest an article</h1>
        <p>Here you will be able to suggest an article tag for the next article that gets generated.</p>
        <p><b>You can only suggest one tag.</b> After an article gets generated, you can do that again.</p>
        <p>When an article gets generated, one random suggested tag gets selected, rest are cleared.</p>
        <p>You can view what tags are suggested for the next article <Link href="/suggestions" className="text-blue-300 underline">here</Link>.</p>

        <form className="mt-8" onSubmit={onSubmit}>
          <p className="font-semibold mb-1">Your suggestion</p>
          <input className="rounded shadow text-black p-2" type="text" name="tag"/>
          <p><button type="submit" className="p-2 bg-green-800 mt-5 mb-5 rounded-lg hover:bg-green-700 transition-colors">Submit suggestion</button></p>

          <p className="text-red-500 font-semibold" id="error"></p>
          <p className="font-semibold" id="message"></p>
        </form>
    </main>
  )
}
