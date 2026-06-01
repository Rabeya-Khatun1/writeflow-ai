// import OpenAI from "openai";

// const globalForOpenAI = globalThis as unknown as {
//   openai: OpenAI | undefined;
// };

// export const openai =
//   globalForOpenAI.openai ??
//   new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
//   });

// if (process.env.NODE_ENV !== "production") {
//   globalForOpenAI.openai = openai;
// }

// export const DEFAULT_MODEL = "gpt-4o-mini";


import OpenAI from "openai";

const globalForOpenAI = globalThis as unknown as {
  openai: OpenAI | undefined;
};

export const openai =
  globalForOpenAI.openai ??
  new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

if (process.env.NODE_ENV !== "production") {
  globalForOpenAI.openai = openai;
}

export const DEFAULT_MODEL = "gpt-4o-mini";


// 🔥 ADD THIS FUNCTION HERE
export async function generateStructuredContent(data: {
  topic?: string;
  tone: string;
  audience?: string;
  prompt?: string;
}) {
  const prompt = data.prompt ?? `
  Write content about: ${data.topic}
  Tone: ${data.tone}
  Audience: ${data.audience}

  Return JSON:
  {
    "title": "",
    "content": "",
    "meta": "",
    "tags": []
  }
  `;

  const response = await openai.responses.create({
    model: DEFAULT_MODEL,
    input: [
      {
        role: "user",
        content: prompt,
      },
    ],
    text: {
      format: {
        type: "json_object",
      },
    },
  });

  return JSON.parse(response.output_text);
}