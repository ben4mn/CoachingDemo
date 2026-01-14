export default function QuartileBadge({ quartile, size = 'default' }) {
  const configs = {
    1: { bg: 'bg-green-100', text: 'text-green-700', label: 'Top 25%' },
    2: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Top 50%' },
    3: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Bottom 50%' },
    4: { bg: 'bg-red-100', text: 'text-red-700', label: 'Bottom 25%' },
  }

  const config = configs[quartile] || configs[2]

  return (
    <span className={`
      inline-flex items-center rounded-full font-medium
      ${config.bg} ${config.text}
      ${size === 'small' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'}
    `}>
      {config.label}
    </span>
  )
}
