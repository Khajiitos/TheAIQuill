const OpenAI = require("openai");

const openai = new OpenAI({apiKey: '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'});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

main();