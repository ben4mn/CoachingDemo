export default function TrendSparkline({ data = [], benchmark, color = '#4248ED', height = 40 }) {
  if (data.length < 2) return null

  const min = Math.min(...data) * 0.9
  const max = Math.max(...data, benchmark || 0) * 1.1
  const range = max - min

  const width = 120
  const padding = 4

  const points = data.map((value, index) => {
    const x = padding + (index / (data.length - 1)) * (width - 2 * padding)
    const y = height - padding - ((value - min) / range) * (height - 2 * padding)
    return `${x},${y}`
  }).join(' ')

  const benchmarkY = benchmark
    ? height - padding - ((benchmark - min) / range) * (height - 2 * padding)
    : null

  // Calculate trend direction
  const firstHalf = data.slice(0, Math.floor(data.length / 2))
  const secondHalf = data.slice(Math.floor(data.length / 2))
  const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length
  const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length
  const trendUp = secondAvg > firstAvg

  return (
    <div className="inline-flex items-center gap-2">
      <svg width={width} height={height} className="overflow-visible">
        {/* Benchmark line */}
        {benchmarkY && (
          <>
            <line
              x1={padding}
              y1={benchmarkY}
              x2={width - padding}
              y2={benchmarkY}
              stroke="#10b981"
              strokeWidth="1"
              strokeDasharray="3,3"
              opacity="0.6"
            />
            <text
              x={width - padding + 2}
              y={benchmarkY + 3}
              fontSize="8"
              fill="#10b981"
              className="font-medium"
            >
              Top
            </text>
          </>
        )}

        {/* Trend line */}
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Dots at each data point */}
        {data.map((value, index) => {
          const x = padding + (index / (data.length - 1)) * (width - 2 * padding)
          const y = height - padding - ((value - min) / range) * (height - 2 * padding)
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r={index === data.length - 1 ? 3 : 2}
              fill={index === data.length - 1 ? color : 'white'}
              stroke={color}
              strokeWidth="1.5"
            />
          )
        })}
      </svg>

      {/* Trend indicator */}
      <span className={`text-xs font-medium ${trendUp ? 'text-green-600' : 'text-yellow-600'}`}>
        {trendUp ? '↑' : '→'}
      </span>
    </div>
  )
}
