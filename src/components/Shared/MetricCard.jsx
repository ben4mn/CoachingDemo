export default function MetricCard({ label, value, trend, change, suffix = '', size = 'default' }) {
  const isPositive = trend === 'up' || (typeof change === 'number' && change > 0)
  const isNegative = trend === 'down' || (typeof change === 'number' && change < 0)

  // For cancellation rate, down is good
  const invertTrend = label?.toLowerCase().includes('cancellation')
  const displayPositive = invertTrend ? isNegative : isPositive
  const displayNegative = invertTrend ? isPositive : isNegative

  return (
    <div className={`bg-white rounded-xl border border-gray-100 shadow-sm ${size === 'small' ? 'p-3' : 'p-4'}`}>
      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
        {label}
      </div>
      <div className="flex items-end gap-2">
        <span className={`font-bold text-[#020247] ${size === 'small' ? 'text-xl' : 'text-2xl'}`}>
          {typeof value === 'number' ? value.toLocaleString() : value}{suffix}
        </span>
        {(trend || change !== undefined) && (
          <span className={`
            flex items-center text-xs font-medium pb-1
            ${displayPositive ? 'text-green-600' : displayNegative ? 'text-red-600' : 'text-gray-500'}
          `}>
            {displayPositive && (
              <svg className="w-3 h-3 mr-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            )}
            {displayNegative && (
              <svg className="w-3 h-3 mr-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
            {!displayPositive && !displayNegative && '→'}
            {change !== undefined && (
              <span>{change > 0 ? '+' : ''}{change}{suffix}</span>
            )}
          </span>
        )}
      </div>
    </div>
  )
}
