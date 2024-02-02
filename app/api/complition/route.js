import { CohereStream, StreamingTextResponse } from "ai";

import { NextResponse } from "next/server";

export const runtime = "edge";

export const POST = async (req) => {
  const { prompt } = await req.json();

  const body = JSON.stringify({
    prompt,
    model: "command-nightly",
    max_tokens: 500,
    stop_sequences: [],
    temperature: 0.9,
    return_likelihoods: "NONE",
    stream: true,
  });

  const response = await fetch("https://api.cohere.ai/v2/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.COHERE_API}`,
    },
    body,
  });

  if (!response.ok) {
    return new NextResponse(await response.text(), { status: response.status });
  }
  const stream = CohereStream(response);
  //   console.log(stream);
  return new StreamingTextResponse(stream);
};
