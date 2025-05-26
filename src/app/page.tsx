"use client";

import { useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleAsk(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setAnswer("");
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      if (res.ok) {
        setAnswer(data.answer);
      } else {
        setError(data.error || "An error occurred.");
      }
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] w-full px-2">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-fuchsia-600 drop-shadow mb-2 animate-bounce">
        Welcome to Funny Formal AI! 🤖
      </h1>
      <p className="text-lg md:text-xl text-center text-blue-700 font-semibold mb-8">
        Ask anything, get a formal answer... with a twist of fun! 🎉
      </p>
      <form
        onSubmit={handleAsk}
        className="w-full max-w-xl flex flex-col gap-4 mb-6 bg-white/80 rounded-xl shadow-lg p-6 border-4 border-dashed border-yellow-300"
      >
        <textarea
          className="p-3 rounded border-2 border-fuchsia-300 bg-yellow-50 text-gray-900 min-h-[80px] resize-none focus:outline-none focus:ring-2 focus:ring-fuchsia-400 text-lg font-mono"
          placeholder="Type your most burning question here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-fuchsia-500 via-yellow-400 to-cyan-400 text-white font-bold py-2 px-6 rounded-full shadow hover:scale-105 transition-transform disabled:opacity-50 text-lg"
          disabled={loading || !question.trim()}
        >
          {loading ? "The AI is thinking... 🧠" : "Ask the AI!"}
        </button>
      </form>
      {answer && (
        <div className="w-full max-w-xl bg-cyan-50 border-2 border-fuchsia-300 rounded-xl p-4 shadow mb-4 animate-pulse">
          <h2 className="font-bold mb-2 text-fuchsia-700 text-lg">
            Formal (and Funny) Answer:
          </h2>
          <p className="whitespace-pre-line text-blue-900 text-lg">
            {answer}
          </p>
        </div>
      )}
      {error && (
        <div className="w-full max-w-xl text-red-600 font-bold mb-4">
          {error}
        </div>
      )}
      <footer className="mt-10 text-center text-xs text-gray-500 dark:text-gray-400 pt-8">
        Powered by{" "}
        <span className="font-bold text-fuchsia-500">Next.js</span>,{" "}
        <span className="font-bold text-yellow-500">Tailwind CSS</span>, and{" "}
        <span className="font-bold text-cyan-500">OpenAI</span>.
        <br />
        <span className="italic">
          No robots were harmed in the making of this app. 🤡
        </span>
      </footer>
    </main>
  );
}
