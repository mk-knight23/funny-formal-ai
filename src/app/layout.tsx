import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Funny Formal AI - Where Bureaucracy Meets Comedy",
  description: "Ask anything, get a formal answer with a twist of fun! Powered by Groq's lightning-fast AI with 16 free models.",
  keywords: ["AI", "Groq", "Llama", "Chat", "Funny", "Formal", "Free AI"],
  authors: [{ name: "mk-knight23" }],
  openGraph: {
    title: "Funny Formal AI",
    description: "Ask anything, get a formal answer with a twist of fun!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-pink-200 via-yellow-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen transition-colors`}>
        <nav className="w-full flex items-center justify-between px-6 py-4 bg-gradient-to-r from-fuchsia-500 via-yellow-400 to-cyan-400 dark:from-fuchsia-700 dark:via-yellow-600 dark:to-cyan-600 shadow-lg sticky top-0 z-50 transition-colors backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-extrabold text-white drop-shadow animate-bounce" role="img" aria-label="Robot">🤖</span>
            <Link href="/" className="text-xl font-bold text-white tracking-wider hover:opacity-90 transition-opacity">
              Funny Formal AI
            </Link>
          </div>
          <div className="flex gap-4 items-center">
            <Link href="/" className="text-white font-semibold hover:text-black dark:hover:text-gray-200 transition-colors" aria-label="Home">
              Home
            </Link>
            <a 
              href="https://github.com/mk-knight23/funny-formal-ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white font-semibold hover:text-black dark:hover:text-gray-200 transition-colors"
              aria-label="GitHub"
            >
              GitHub
            </a>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
