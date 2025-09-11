'use client';

export const dynamic = 'force-dynamic';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SearchPage() {
  // Prevent running during build (SSR)
  if (typeof window === 'undefined') return null;

  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResult(data.answer || 'No answer returned.');
      } catch (err) {
        setResult('Error fetching search results.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  const routeToTool = (type: string, tone = 'friendly') => {
    router.push(`/action/${type}?q=${encodeURIComponent(query)}&tone=${tone}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <pre className="whitespace-pre-wrap text-gray-700 mb-6">{result}</pre>
          <div className="flex gap-4">
            <button
              onClick={() => routeToTool('blog')}
              className="px-4 py-2 bg-black text-white rounded"
            >
              Convert to Blog
            </button>
            <button
              onClick={() => routeToTool('slides')}
              className="px-4 py-2 bg-black text-white rounded"
            >
              Convert to Slides
            </button>
          </div>
        </>
      )}
    </div>
  );
}
