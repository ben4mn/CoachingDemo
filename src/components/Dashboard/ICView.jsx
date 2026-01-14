import MetricCard from '../Shared/MetricCard'
import CoachingItem from '../Shared/CoachingItem'
import mockUsers from '../../data/mockUsers.json'

export default function ICView() {
  const user = mockUsers.currentUser

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#020247]">Welcome back, {user.name.split(' ')[0]}</h1>
        <p className="text-gray-600">Here's your coaching overview for this week</p>
      </div>

      {/* Performance Metrics */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Performance Snapshot</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <MetricCard
            label="Bookings"
            value={user.metrics.bookings}
            trend={user.metrics.bookingsTrend}
            change={user.metrics.bookingsChange}
            suffix="%"
          />
          <MetricCard
            label="Cancellation Rate"
            value={user.metrics.cancellationRate}
            trend={user.metrics.cancellationTrend}
            change={user.metrics.cancellationChange}
            suffix="%"
          />
          <MetricCard
            label="Rev+ Score"
            value={user.metrics.revPlus}
            trend={user.metrics.revPlusTrend}
          />
          <MetricCard
            label="VB Adoption"
            value={user.metrics.vbAdoption}
            trend={user.metrics.vbAdoptionTrend}
            suffix="%"
          />
          <MetricCard
            label="Offer Strength"
            value={user.metrics.offerStrength}
            suffix="/100"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Coaching Opportunities - Main Column */}
        <div className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Your Coaching Opportunities
            </h2>
            <span className="text-xs bg-[#000099] text-white px-2 py-1 rounded-full">
              {user.coachingItems.length} active
            </span>
          </div>
          <div className="space-y-4">
            {user.coachingItems.map((item, index) => (
              <CoachingItem key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Progress on Previous Coaching */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Recent Progress
            </h3>
            <div className="space-y-3">
              {user.previousCoaching.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      item.status === 'improved' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {item.status === 'improved' ? '↑' : '→'}
                    </div>
                    <span className="text-sm text-gray-700">{item.item}</span>
                  </div>
                  <span className={`text-sm font-medium ${
                    item.status === 'improved' ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {item.change}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Strengths */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100 p-4">
            <h3 className="text-sm font-semibold text-green-700 uppercase tracking-wide mb-3 flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Your Strengths
            </h3>
            <ul className="space-y-2">
              {user.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-green-800">
                  <span className="text-green-500 mt-0.5">•</span>
                  {strength}
                </li>
              ))}
            </ul>
          </div>

          {/* Atlas Tips */}
          <div className="bg-gradient-to-br from-[#000099]/5 to-[#4248ED]/10 rounded-xl border border-[#000099]/10 p-4">
            <h3 className="text-sm font-semibold text-[#000099] uppercase tracking-wide mb-3 flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Atlas Tip of the Day
            </h3>
            <p className="text-sm text-[#020247] leading-relaxed">
              Your sentiment scores jumped 15% when you used partner-specific data in your opening.
              Try: "I noticed your [specific metric] has [changed] - let's talk about that first."
            </p>
            <button className="mt-3 text-xs font-medium text-[#4248ED] hover:text-[#000099] transition-colors">
              See more tips →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
