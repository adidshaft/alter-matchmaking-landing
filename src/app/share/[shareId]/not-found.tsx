export default function ShareNotFound() {
  return (
    <div className="min-h-screen bg-[#0a0614] flex flex-col items-center justify-center px-4 text-center">
      <div className="text-5xl mb-4">🌀</div>
      <h1 className="text-xl font-bold text-white mb-2">Link not found</h1>
      <p className="text-sm text-zinc-400 max-w-xs leading-relaxed">
        This share link may have expired or been removed. Ask your friend to share a new one.
      </p>
      <a
        href="https://apps.apple.com/app/alter/id6743469697"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-black hover:bg-zinc-100 transition active:scale-95"
      >
        🌀 Download Alter
      </a>
    </div>
  );
}
