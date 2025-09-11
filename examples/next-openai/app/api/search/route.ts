import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q');

  if (!q) {
    return NextResponse.json({ error: 'No query provided' }, { status: 400 });
  }

  if (!process.env.TAVILY_API_KEY || !process.env.OPENROUTER_API_KEY) {
    return NextResponse.json({
      answer: `Missing API keys. Add TAVILY_API_KEY and OPENROUTER_API_KEY to Vercel.`,
    });
  }

  try {
    const tavilyRes = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.TAVILY_API_KEY}`,
      },
      body: JSON.stringify({ query: q, include_answer: true, search_depth: 'advanced' }),
    });

    const tavilyData = await tavilyRes.json();
    const context = tavilyData.answer || 'No answer from Tavily.';

    const prompt = `Use the following context to answer the user's question:\n\n"${context}"\n\nQuestion: ${q}\n\nAnswer:`;

    const llmRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct',
        messages: [
          { role: 'system', content: 'You are a smart AI research assistant.' },
          { role: 'user', content: prompt },
        ],
      }),
    });

    const llmData = await llmRes.json();
    const answer = llmData.choices?.[0]?.message?.content || 'No response from LLM.';

    return NextResponse.json({ answer, context });
  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json({ answer: 'Something went wrong. Try again later.' });
  }
}
