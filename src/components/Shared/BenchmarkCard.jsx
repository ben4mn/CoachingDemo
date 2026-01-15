import TrendSparkline from './TrendSparkline'

export default function BenchmarkCard({ benchmark }) {
  const { label, yours, topPerformer, trend, insight, trainingContent } = benchmark
  const percentage = Math.round((yours / topPerformer) * 100)
  const gap = topPerformer - yours

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-700">{label}</h3>
        <TrendSparkline data={trend} benchmark={topPerformer} />
      </div>

      {/* Score comparison */}
      <div className="flex items-end gap-4 mb-3">
        <div>
          <span className="text-2xl font-bold text-[#020247]">{yours}</span>
          <span className="text-sm text-gray-500 ml-1">You</span>
        </div>
        <div className="text-gray-400">vs</div>
        <div>
          <span className="text-lg font-semibold text-green-600">{topPerformer}</span>
          <span className="text-sm text-gray-500 ml-1">Top 20%</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${Math.min(percentage, 100)}%`,
              backgroundColor: percentage >= 90 ? '#10b981' : percentage >= 70 ? '#4248ED' : '#f59e0b'
            }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-xs text-gray-500">{percentage}% of top performer</span>
          <span className={`text-xs font-medium ${gap > 0 ? 'text-amber-600' : 'text-green-600'}`}>
            {gap > 0 ? `${gap.toFixed(1)} gap` : 'On target!'}
          </span>
        </div>
      </div>

      {/* Insight */}
      <div className="flex items-start gap-2 p-2 bg-blue-50 rounded-lg mb-3">
        <svg className="w-4 h-4 text-[#4248ED] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        <p className="text-xs text-[#020247]">{insight}</p>
      </div>

      {/* Training link */}
      {trainingContent && (
        <a
          href={trainingContent.url}
          className="inline-flex items-center gap-1.5 text-xs text-[#4248ED] hover:text-[#000099] transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          {trainingContent.title}
        </a>
      )}
    </div>
  )
}
