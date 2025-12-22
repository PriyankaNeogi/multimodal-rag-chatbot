import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch("http://localhost:8000/query", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question: body.message,
    }),
  });

  const data = await res.json();

  return NextResponse.json({
    role: "assistant",
    content: data.answer,
  });
}
