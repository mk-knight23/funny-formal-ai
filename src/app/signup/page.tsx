export default function Signup() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] w-full px-2">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-fuchsia-500 drop-shadow mb-2 animate-bounce">Sign Up for Maximum Fun! 🥳</h1>
      <p className="text-lg md:text-xl text-center text-cyan-700 font-semibold mb-8">Join the formal (but funny) revolution. It only takes a second!</p>
      <form className="w-full max-w-sm flex flex-col gap-4 bg-white/80 rounded-xl shadow-lg p-6 border-4 border-dashed border-fuchsia-400">
        <input type="text" placeholder="Name" className="p-3 rounded border-2 border-fuchsia-400 bg-fuchsia-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 text-lg font-mono" required />
        <input type="email" placeholder="Email" className="p-3 rounded border-2 border-fuchsia-400 bg-fuchsia-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 text-lg font-mono" required />
        <input type="password" placeholder="Password" className="p-3 rounded border-2 border-fuchsia-400 bg-fuchsia-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 text-lg font-mono" required />
        <button type="submit" className="bg-gradient-to-r from-fuchsia-400 via-yellow-400 to-cyan-400 text-white font-bold py-2 px-6 rounded-full shadow hover:scale-105 transition-transform text-lg">Sign Up 🎉</button>
      </form>
      <div className="mt-8 text-center text-sm text-gray-600">Already have an account? <span className="font-bold text-fuchsia-600">Login and join the fun!</span></div>
    </main>
  );
}
