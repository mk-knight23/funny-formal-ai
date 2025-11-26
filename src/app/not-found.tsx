// Funny Formal AI - 404 Not Found
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] w-full px-2">
      <h1 className="text-5xl font-extrabold text-center text-red-500 drop-shadow mb-2 animate-bounce">404 - Oops!</h1>
      <p className="text-lg text-center text-fuchsia-700 dark:text-fuchsia-400 font-semibold mb-8">
        You found a page that even our AI can&apos;t explain. Try the menu above!
      </p>
      <span className="text-6xl" role="img" aria-label="Confused person">🤷‍♂️</span>
      <Link 
        href="/" 
        className="mt-8 px-6 py-3 bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-white font-bold rounded-full hover:scale-105 transition-transform"
      >
        Go Home
      </Link>
    </main>
  );
}
