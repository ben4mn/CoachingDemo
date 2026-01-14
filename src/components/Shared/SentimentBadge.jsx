export default function SentimentBadge({ sentiment, score, size = 'default' }) {
  const configs = {
    positive: {
      bg: 'bg-green-100',
      text: 'text-green-700',
      label: 'Positive'
    },
    neutral: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-700',
      label: 'Neutral'
    },
    negative: {
      bg: 'bg-red-100',
      text: 'text-red-700',
      label: 'Negative'
    }
  }

  const config = configs[sentiment] || configs.neutral

  return (
    <span className={`
      inline-flex items-center gap-1 rounded-full font-medium
      ${config.bg} ${config.text}
      ${size === 'small' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'}
    `}>
      <span className={`
        rounded-full
        ${sentiment === 'positive' ? 'bg-green-500' : sentiment === 'negative' ? 'bg-red-500' : 'bg-yellow-500'}
        ${size === 'small' ? 'w-1.5 h-1.5' : 'w-2 h-2'}
      `}></span>
      {config.label}
      {score !== undefined && <span className="opacity-70">({score}%)</span>}
    </span>
  )
}
