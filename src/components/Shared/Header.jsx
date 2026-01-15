export default function Header({ onOpenChat }) {
  return (
    <header className="bg-[#000099] text-white px-6 py-4 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" fill="#4248ED"/>
            <path d="M10 16L14 20L22 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-xl font-bold">Atlas Coaching</span>
        </div>
        <span className="text-sm text-white/60 border-l border-white/20 pl-4">Market Manager Dashboard</span>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onOpenChat}
          className="flex items-center gap-2 bg-[#4248ED] hover:bg-[#5258FF] px-4 py-2 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span>Ask Atlas</span>
        </button>

        <div className="flex items-center gap-3 border-l border-white/20 pl-4">
          <div className="w-9 h-9 bg-[#4248ED] rounded-full flex items-center justify-center font-semibold text-sm">
            BF
          </div>
          <div className="text-sm">
            <div className="font-medium">Ben Foreman</div>
            <div className="text-white/60 text-xs">Market Manager • EMEA</div>
          </div>
        </div>
      </div>
    </header>
  )
}
