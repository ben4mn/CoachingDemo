import { useState } from 'react'
import InsightAttribution from './InsightAttribution'

export default function CoachingItem({ item, index }) {
  const [expanded, setExpanded] = useState(false)

  const typeColors = {
    growth: { bg: 'bg-blue-100', text: 'text-blue-700', icon: '📈' },
    efficiency: { bg: 'bg-purple-100', text: 'text-purple-700', icon: '⚡' },
    satisfaction: { bg: 'bg-green-100', text: 'text-green-700', icon: '💚' },
  }

  const typeConfig = typeColors[item.type] || typeColors.growth

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div
        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 bg-[#000099] text-white rounded-lg flex items-center justify-center font-bold text-sm">
            {index + 1}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeConfig.bg} ${typeConfig.text}`}>
                {typeConfig.icon} {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
              </span>
            </div>
            <h4 className="font-medium text-gray-900 mb-1">{item.gap}</h4>
            <p className="text-sm text-gray-600">{item.action}</p>
          </div>
          <div className="flex-shrink-0 text-right">
            <div className="text-sm font-semibold text-[#000099]">{item.expectedImpact}</div>
            <div className="text-xs text-gray-500">expected impact</div>
          </div>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4 border-t border-gray-100 bg-gray-50">
          <div className="pt-4">
            <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Why this matters (Reason to Believe)
            </h5>
            <p className="text-sm text-gray-700 leading-relaxed">{item.reasonToBelieve}</p>

            <InsightAttribution
              sources={['Recent call analysis', 'Top performer benchmark', 'Deal outcome patterns']}
              confidence={87}
              dataNote="Based on aggregated patterns from your region and role"
            />
          </div>
        </div>
      )}
    </div>
  )
}
