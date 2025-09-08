'use client';

import { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    // Replace with real search logic or navigation
    console.log('Searching for:', query);
  };

  return (
    <main className="bg-white text-black min-h-screen w-full px-6 py-12">
      {/* Hero */}
      <section className="text-center max-w-4xl mx-auto mb-20">
        <h1 className="text-5xl font-bold mb-4">Nexora</h1>
        <p className="text-lg text-gray-600 mb-8">
          The Search Engine That Executes™ — Get answers and actions in one click.
        </p>

        <div className="flex justify-center items-center gap-4 max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Ask anything..."
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-900 transition"
          >
            Execute
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center mb-24">
        {[
          { title: 'Real-Time Answers', desc: 'Powered by cutting-edge AI and live search.' },
          { title: 'Instant Actions', desc: 'Generate blogs, scripts, and summaries in one click.' },
          { title: 'Smart Memory', desc: 'Nexora remembers what you searched and builds on it.' },
        ].map((feature, idx) => (
          <div key={idx} className="bg-gray-50 p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* Action Layer Preview */}
      <section className="text-center max-w-3xl mx-auto mb-24">
        <h2 className="text-3xl font-bold mb-4">Execute Your Search</h2>
        <p className="text-gray-600 mb-8">
          Don’t just get links. Nexora turns your queries into blogs, summaries, social scripts, and more.
        </p>
        <div className="grid sm:grid-cols-2 gap-6 text-left">
          {['Blog Post', 'Slide Deck', 'TikTok Script', 'Product Comparison'].map((action, i) => (
            <div key={i} className="border p-4 rounded-xl hover:shadow-md transition">
              <h4 className="font-semibold mb-1">{action}</h4>
              <p className="text-sm text-gray-500">Instantly generate a {action.toLowerCase()} from any query.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center max-w-2xl mx-auto mb-24">
        <h2 className="text-2xl font-bold mb-4">Ready to Try Nexora?</h2>
        <p className="text-gray-600 mb-6">
          No fluff. No ads. Just pure execution.
        </p>
        <button
          onClick={handleSearch}
          className="px-8 py-4 bg-black text-white rounded-full hover:bg-gray-900 transition text-lg"
        >
          Start Searching
        </button>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 border-t pt-6">
        © {new Date().getFullYear()} Nexora. Built for doers.
      </footer>
    </main>
  );
}
