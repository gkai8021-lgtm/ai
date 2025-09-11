import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { query, type, tone } = await req.json();

  const tonePromptMap: Record<string, string> = {
    friendly: 'Write in a casual and friendly tone.',
    professional: 'Use a formal, professional tone.',
    bold: 'Write confidently with punch and energy.',
    persuasive: 'Use benefit-driven, emotional language.',
    aggressive: 'Be assertive, dominant, and direct.',
    savage: 'Write ruthlessly with wit, sarcasm, or dark humor.',
  };

  const instruction = tonePromptMap[tone] || '';

  const prompt = `${instruction}\n\nGenerate a ${type} based on the following:\n"${query}"`;

  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'mistralai/mistral-7b-instruct',
      messages: [
        { role: 'system', content: 'You are a skilled AI content writer.' },
        { role: 'user', content: prompt },
      ],
    }),
  });

  const data = await res.json();
  const output = data.choices?.[0]?.message?.content || 'No output.';

  return NextResponse.json({ output });
}
