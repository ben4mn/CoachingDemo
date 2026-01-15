import SentimentBadge from '../Shared/SentimentBadge'
import QuartileBadge from '../Shared/QuartileBadge'

export default function TeamMemberDetail({ member, onClose }) {
  const evidence = member.coachingEvidence

  return (
    <div className="bg-white border-t border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-bold ${
            member.riskLevel === 'high' ? 'bg-red-500' :
            member.riskLevel === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
          }`}>
            {member.avatar}
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#020247]">{member.name}</h3>
            <p className="text-sm text-gray-600">{member.role} • {member.region}</p>
            <div className="flex items-center gap-2 mt-1">
              <QuartileBadge quartile={member.quartile} size="small" />
              <SentimentBadge sentiment={member.sentiment} size="small" />
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {evidence ? (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column - Recent Calls & Behavior Gaps */}
          <div className="space-y-6">
            {/* Recent Calls */}
            <div>
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Recent Calls
              </h4>
              <div className="space-y-2">
                {evidence.recentCalls.map((call) => (
                  <div key={call.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        call.sentiment === 'positive' ? 'bg-green-500' :
                        call.sentiment === 'negative' ? 'bg-red-500' : 'bg-yellow-500'
                      }`} />
                      <span className="text-sm font-medium text-gray-700">{call.partner}</span>
                    </div>
                    <span className="text-xs text-gray-500">{call.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Behavior Gaps with Evidence */}
            <div>
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Development Areas
              </h4>
              <div className="space-y-4">
                {evidence.behaviorGaps.map((gap, index) => (
                  <div key={index} className="bg-red-50 border border-red-100 rounded-lg p-4">
                    <div className="flex items-start gap-2 mb-2">
                      <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <h5 className="font-medium text-red-800">{gap.behavior}</h5>
                        <p className="text-sm text-red-700">{gap.gap}</p>
                      </div>
                    </div>

                    {/* Call Snippets */}
                    <div className="mt-3 space-y-2">
                      {gap.snippets.map((snippet, i) => (
                        <div key={i} className="pl-4 border-l-2 border-red-200">
                          <p className="text-sm text-gray-700 italic">"{snippet.quote}"</p>
                          <p className="text-xs text-gray-500 mt-1">
                            Call: {snippet.callId} • {snippet.timestamp}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Suggestion */}
                    <div className="mt-3 p-2 bg-white rounded-lg">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium text-[#4248ED]">Suggestion:</span> {gap.suggestion}
                      </p>
                      {gap.trainingContent && (
                        <a
                          href={gap.trainingContent.url}
                          className="mt-2 inline-flex items-center gap-1 text-xs text-[#4248ED] hover:text-[#000099]"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                          {gap.trainingContent.title}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Strengths & Coaching History */}
          <div className="space-y-6">
            {/* Strengths */}
            <div className="bg-green-50 border border-green-100 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-green-700 uppercase tracking-wide mb-3 flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Strengths
              </h4>
              <ul className="space-y-2">
                {evidence.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-green-800">
                    <span className="text-green-500 mt-0.5">•</span>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>

            {/* Coaching History */}
            <div>
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Coaching History
              </h4>
              <div className="space-y-2">
                {evidence.coachingHistory.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-700">{item.topic}</p>
                      <p className="text-xs text-gray-500">{item.date}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.outcome === 'improved' ? 'bg-green-100 text-green-700' :
                      item.outcome === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {item.outcome === 'improved' ? `${item.delta}` : item.outcome === 'in-progress' ? 'In Progress' : 'Stable'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule Coaching Button */}
            <button className="w-full py-3 bg-[#000099] hover:bg-[#4248ED] text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Schedule Coaching Session
            </button>

            {/* Attribution */}
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-2">
              <svg className="w-4 h-4 text-[#4248ED]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Evidence from last 30 days of call analysis</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No detailed coaching evidence available for this team member.</p>
          <p className="text-sm text-gray-400 mt-1">Evidence will appear after call analysis is complete.</p>
        </div>
      )}
    </div>
  )
}
