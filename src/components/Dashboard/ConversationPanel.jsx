import { useState } from 'react'
import SentimentBadge from '../Shared/SentimentBadge'
import mockCalls from '../../data/mockCalls.json'

export default function ConversationPanel() {
  const { calls, aggregatedInsights } = mockCalls
  const [selectedCall, setSelectedCall] = useState(null)

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#020247]">Conversation Intelligence</h1>
        <p className="text-gray-600">AI-powered insights from your partner calls</p>
      </div>

      {/* Aggregated Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Total Calls</div>
          <div className="text-2xl font-bold text-[#020247]">{calls.length}</div>
          <div className="text-xs text-gray-500">Last 7 days</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Avg Duration</div>
          <div className="text-2xl font-bold text-[#020247]">{aggregatedInsights.avgCallDuration}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Sentiment</div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-green-600">{aggregatedInsights.sentimentDistribution.positive}%</span>
            <span className="text-sm text-gray-400">positive</span>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Objections</div>
          <div className="text-2xl font-bold text-[#020247]">
            {aggregatedInsights.objectionsResolved}/{aggregatedInsights.objectionsRaised}
          </div>
          <div className="text-xs text-gray-500">resolved</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Action Items</div>
          <div className="text-2xl font-bold text-[#020247]">
            {aggregatedInsights.actionItemsCompleted}/{aggregatedInsights.actionItemsGenerated}
          </div>
          <div className="text-xs text-gray-500">completed</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calls List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-semibold text-[#020247]">Recent Calls</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {calls.map((call) => (
                <div
                  key={call.id}
                  className={`p-4 cursor-pointer transition-colors ${
                    selectedCall?.id === call.id ? 'bg-[#000099]/5' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedCall(call)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#4248ED] rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                        {call.partnerLogo}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{call.partner}</div>
                        <div className="text-xs text-gray-500">{call.date} • {call.time} • {call.duration}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{call.type}</span>
                      <SentimentBadge sentiment={call.sentiment} score={call.sentimentScore} size="small" />
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{call.summary}</p>

                  <div className="flex flex-wrap gap-1">
                    {call.topics.map((topic, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar - Selected Call Details or Insights */}
        <div className="space-y-6">
          {selectedCall ? (
            /* Call Detail View */
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-[#020247]">Call Details</h3>
                <button
                  onClick={() => setSelectedCall(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                {/* Summary */}
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Summary</h4>
                  <p className="text-sm text-gray-700">{selectedCall.summary}</p>
                </div>

                {/* Key Quotes */}
                {selectedCall.keyQuotes?.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Key Quotes</h4>
                    <div className="space-y-2">
                      {selectedCall.keyQuotes.map((quote, idx) => (
                        <div key={idx} className="pl-3 border-l-2 border-[#4248ED] text-sm text-gray-600 italic">
                          "{quote}"
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Objections */}
                {selectedCall.objections?.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Objections</h4>
                    <div className="space-y-2">
                      {selectedCall.objections.map((obj, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm">
                          <span className={`w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center text-xs ${
                            obj.resolved ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                          }`}>
                            {obj.resolved ? '✓' : '!'}
                          </span>
                          <div>
                            <div className="font-medium text-gray-700">{obj.topic}</div>
                            <div className="text-gray-500 text-xs">{obj.notes}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Items */}
                {selectedCall.actionItems?.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Action Items</h4>
                    <ul className="space-y-1">
                      {selectedCall.actionItems.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                          <span className="w-1.5 h-1.5 bg-[#4248ED] rounded-full"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Coaching Insight */}
                {selectedCall.coachingInsight && (
                  <div className="p-3 bg-[#000099]/5 rounded-lg">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#000099] mb-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                      </svg>
                      Atlas Coaching Insight
                    </div>
                    <p className="text-sm text-[#020247]">{selectedCall.coachingInsight}</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Aggregated Insights */
            <>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <h3 className="font-semibold text-[#020247] mb-4">Top Themes</h3>
                <div className="space-y-3">
                  {aggregatedInsights.topThemes.map((theme, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700">{theme.theme}</span>
                        <span className="text-gray-500">{theme.count} calls ({theme.percentage}%)</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#4248ED] rounded-full"
                          style={{ width: `${theme.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <h3 className="font-semibold text-[#020247] mb-4">Sentiment Distribution</h3>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="flex-1 h-8 bg-green-200 rounded-l-lg flex items-center justify-center text-xs font-medium text-green-700" style={{ flex: aggregatedInsights.sentimentDistribution.positive }}>
                    {aggregatedInsights.sentimentDistribution.positive}%
                  </div>
                  <div className="flex-1 h-8 bg-yellow-200 flex items-center justify-center text-xs font-medium text-yellow-700" style={{ flex: aggregatedInsights.sentimentDistribution.neutral }}>
                    {aggregatedInsights.sentimentDistribution.neutral}%
                  </div>
                  <div className="flex-1 h-8 bg-red-200 rounded-r-lg flex items-center justify-center text-xs font-medium text-red-700" style={{ flex: aggregatedInsights.sentimentDistribution.negative }}>
                    {aggregatedInsights.sentimentDistribution.negative}%
                  </div>
                </div>
                <div className="flex justify-center gap-4 text-xs">
                  <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-200 rounded"></span> Positive</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 bg-yellow-200 rounded"></span> Neutral</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 bg-red-200 rounded"></span> Negative</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#000099]/5 to-[#4248ED]/10 rounded-xl border border-[#000099]/10 p-4">
                <div className="flex items-center gap-2 text-[#000099] mb-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                  </svg>
                  <h3 className="font-semibold">Atlas Recommendation</h3>
                </div>
                <p className="text-sm text-[#020247]">
                  Pricing objections are your most common challenge (62% of calls). Consider leading with ROI data when discussing rates - your positive sentiment calls had 3x more data-backed responses.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
