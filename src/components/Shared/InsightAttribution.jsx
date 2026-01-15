import { useState } from 'react'

export default function InsightAttribution({ sources = [], confidence, dataNote, compact = false }) {
  const [expanded, setExpanded] = useState(false)

  if (compact) {
    return (
      <button
        onClick={() => setExpanded(!expanded)}
        className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-[#4248ED] transition-colors"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Why this?
      </button>
    )
  }

  return (
    <div className="mt-3 pt-3 border-t border-gray-100">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 text-xs text-gray-500 hover:text-[#4248ED] transition-colors w-full"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <span>Why am I seeing this?</span>
        <svg
          className={`w-3 h-3 ml-auto transition-transform ${expanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {expanded && (
        <div className="mt-3 space-y-3 text-xs">
          {/* Sources */}
          {sources.length > 0 && (
            <div>
              <p className="text-gray-500 font-medium mb-1.5">Based on:</p>
              <div className="flex flex-wrap gap-1.5">
                {sources.map((source, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-gray-50 text-gray-600 rounded-full"
                  >
                    <svg className="w-3 h-3 text-[#4248ED]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {source}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Confidence */}
          {confidence !== undefined && (
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Confidence:</span>
              <div className="flex items-center gap-2 flex-1">
                <div className="h-1.5 flex-1 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#4248ED] rounded-full transition-all"
                    style={{ width: `${confidence}%` }}
                  />
                </div>
                <span className="text-gray-700 font-medium">{confidence}%</span>
              </div>
            </div>
          )}

          {/* Privacy Note */}
          {dataNote && (
            <div className="flex items-start gap-2 p-2 bg-blue-50 rounded-lg">
              <svg className="w-4 h-4 text-[#000099] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <p className="text-[#020247]">{dataNote}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
