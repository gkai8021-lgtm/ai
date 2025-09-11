'use client';

export const dynamic = 'force-dynamic';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResult(data.answer);
      setLoading(false);
    };

    if (query) fetchData();
  }, [query]);

  const routeToTool = (type: string, tone = 'friendly') => {
    router.push(`/action/${type}?q=${encodeURIComponent(query)}&tone=${tone}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      <p className="mb-6 text-gray-600">You asked: <strong>{query}</strong></p>

      {loading ? <p>Loading...</p> : (
        <>
          <div className="bg-gray-100 p-4 rounded-md whitespace-pre-wrap mb-6">
            {result}
          </div>

          <h3 className="font-semibold text-lg mb-2">Action Layer:</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <button className="border p-3 rounded-md hover:bg-gray-100" onClick={() => routeToTool('blog')}>📝 Turn Into Blog Post</button>
            <button className="border p-3 rounded-md hover:bg-gray-100" onClick={() => routeToTool('summary')}>📌 Summarize</button>
            <button className="border p-3 rounded-md hover:bg-gray-100" onClick={() => routeToTool('tiktok')}>🎥 Create TikTok Script</button>
            <button className="border p-3 rounded-md hover:bg-gray-100" onClick={() => routeToTool('email')}>📧 Generate Email</button>
          </div>
        </>
      )}
    </div>
  );
}
