export function LoadingSkeleton({ darkMode }: { darkMode: boolean }) {
  return (
    <div className={`w-full max-w-4xl mb-4 rounded-xl p-4 ${darkMode ? 'bg-gray-800' : 'bg-white/80'} shadow-lg animate-pulse`}>
      <div className="space-y-3">
        <div className={`h-4 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} w-3/4`}></div>
        <div className={`h-4 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} w-full`}></div>
        <div className={`h-4 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} w-5/6`}></div>
      </div>
    </div>
  );
}
