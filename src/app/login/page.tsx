export default function Login() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] w-full px-2">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-yellow-500 drop-shadow mb-2 animate-bounce">Login to the Fun Zone! 🎈</h1>
      <p className="text-lg md:text-xl text-center text-fuchsia-700 font-semibold mb-8">Serious security, silly vibes. Enter your credentials below!</p>
      <form className="w-full max-w-sm flex flex-col gap-4 bg-white/80 rounded-xl shadow-lg p-6 border-4 border-dashed border-yellow-400">
        <input type="email" placeholder="Email" className="p-3 rounded border-2 border-yellow-400 bg-yellow-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-lg font-mono" required />
        <input type="password" placeholder="Password" className="p-3 rounded border-2 border-yellow-400 bg-yellow-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-lg font-mono" required />
        <button type="submit" className="bg-gradient-to-r from-yellow-400 via-fuchsia-400 to-cyan-400 text-white font-bold py-2 px-6 rounded-full shadow hover:scale-105 transition-transform text-lg">Login 🚪</button>
      </form>
      <div className="mt-8 text-center text-sm text-gray-600">Forgot your password? <span className="font-bold text-yellow-600">Try remembering harder! 😜</span></div>
    </main>
  );
}
