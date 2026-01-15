import { useState } from 'react'

export default function LivePromptCard({ prompt, onDismiss, onHelpful }) {
  const [dismissed, setDismissed] = useState(false)
  const [feedbackGiven, setFeedbackGiven] = useState(false)

  if (dismissed) return null

  const handleDismiss = () => {
    setDismissed(true)
    onDismiss?.(prompt.id)
  }

  const handleHelpful = () => {
    setFeedbackGiven(true)
    onHelpful?.(prompt.id)
  }

  return (
    <div className="bg-white rounded-xl border-2 border-[#4248ED]/30 shadow-sm p-4 relative overflow-hidden">
      {/* Subtle pulse indicator */}
      <div className="absolute top-0 left-0 w-1 h-full bg-[#4248ED] animate-pulse" />

      {/* Main suggestion */}
      <div className="pl-3">
        <div className="flex items-start justify-between gap-3 mb-2">
          <p className="text-[#020247] font-medium leading-snug">{prompt.text}</p>
          <button
            onClick={handleDismiss}
            className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Why - Attribution */}
        <div className="flex items-center gap-2 mb-3">
          <svg className="w-4 h-4 text-[#4248ED]" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <p className="text-xs text-gray-600">{prompt.reasoning}</p>
        </div>

        {/* Seismic content link */}
        {prompt.seismicContent && (
          <a
            href={prompt.seismicContent.url}
            className="inline-flex items-center gap-1.5 text-xs text-[#4248ED] hover:text-[#000099] transition-colors mb-3"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span>{prompt.seismicContent.title}</span>
            <span className="px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded text-[10px] uppercase">
              {prompt.seismicContent.type}
            </span>
          </a>
        )}

        {/* Feedback buttons */}
        <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
          {feedbackGiven ? (
            <span className="text-xs text-green-600 flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Thanks for the feedback!
            </span>
          ) : (
            <>
              <button
                onClick={handleHelpful}
                className="text-xs text-gray-500 hover:text-green-600 transition-colors flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
                Helpful
              </button>
              <button
                onClick={handleDismiss}
                className="text-xs text-gray-500 hover:text-red-600 transition-colors flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                </svg>
                Not relevant
              </button>
            </>
          )}

          {/* Attribution sources */}
          {prompt.attribution && (
            <div className="ml-auto flex items-center gap-1 text-[10px] text-gray-400">
              <span>{prompt.attribution.confidence}% confidence</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
