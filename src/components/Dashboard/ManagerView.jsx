import { useState } from 'react'
import MetricCard from '../Shared/MetricCard'
import SentimentBadge from '../Shared/SentimentBadge'
import QuartileBadge from '../Shared/QuartileBadge'
import TeamMemberDetail from './TeamMemberDetail'
import mockUsers from '../../data/mockUsers.json'

export default function ManagerView() {
  const { teamMembers, teamStats } = mockUsers
  const [sortBy, setSortBy] = useState('risk')
  const [expandedMember, setExpandedMember] = useState(null)

  const sortedMembers = [...teamMembers].sort((a, b) => {
    if (sortBy === 'risk') {
      const riskOrder = { high: 0, medium: 1, low: 2 }
      return riskOrder[a.riskLevel] - riskOrder[b.riskLevel]
    }
    if (sortBy === 'quartile') return a.quartile - b.quartile
    if (sortBy === 'bookings') return b.metrics.bookings - a.metrics.bookings
    return 0
  })

  const getRiskIcon = (risk) => {
    if (risk === 'high') return <span className="w-2 h-2 rounded-full bg-red-500"></span>
    if (risk === 'medium') return <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
    return <span className="w-2 h-2 rounded-full bg-green-500"></span>
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#020247]">Team Coaching Overview</h1>
        <p className="text-gray-600">Monitor and prioritize coaching for your team</p>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <MetricCard label="Team Members" value={teamStats.totalMembers} />
        <MetricCard label="Active Coaching" value={teamStats.activeCoaching} />
        <MetricCard label="Coverage" value={teamStats.coachingCoverage} suffix="%" />
        <MetricCard label="Oppies Captured" value={`${teamStats.oppiesCaptured}/${teamStats.oppiesRecommended}`} />
        <MetricCard label="Est. NBV Impact" value={teamStats.nbvImpact} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Team Roster - Main Column */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-semibold text-[#020247]">Team Members</h2>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#4248ED]"
                >
                  <option value="risk">Priority</option>
                  <option value="quartile">Performance</option>
                  <option value="bookings">Bookings</option>
                </select>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {sortedMembers.map((member) => (
                <div key={member.id}>
                <div
                  onClick={() => setExpandedMember(expandedMember === member.id ? null : member.id)}
                  className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                    expandedMember === member.id ? 'bg-gray-50' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Avatar and Name */}
                    <div className="flex items-center gap-3 min-w-[180px]">
                      <div className="relative">
                        <div className="w-10 h-10 bg-[#4248ED] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {member.avatar}
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5">
                          {getRiskIcon(member.riskLevel)}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{member.name}</div>
                        <div className="text-xs text-gray-500">{member.region}</div>
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="flex-1 grid grid-cols-4 gap-4 text-center">
                      <div>
                        <div className="text-xs text-gray-500">Bookings</div>
                        <div className="font-semibold text-gray-900 flex items-center justify-center gap-1">
                          {member.metrics.bookings.toLocaleString()}
                          {member.metrics.bookingsTrend === 'up' && <span className="text-green-500 text-xs">↑</span>}
                          {member.metrics.bookingsTrend === 'down' && <span className="text-red-500 text-xs">↓</span>}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Cancel %</div>
                        <div className={`font-semibold ${
                          member.metrics.cancellationRate > 8 ? 'text-red-600' : 'text-gray-900'
                        }`}>
                          {member.metrics.cancellationRate}%
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">VB %</div>
                        <div className="font-semibold text-gray-900">{member.metrics.vbAdoption}%</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Quartile</div>
                        <QuartileBadge quartile={member.quartile} size="small" />
                      </div>
                    </div>

                    {/* Sentiment */}
                    <div className="w-24">
                      <SentimentBadge sentiment={member.sentiment} size="small" />
                    </div>
                  </div>

                  {/* Coaching Item */}
                  <div className="mt-3 ml-14 p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 text-sm">
                      <svg className="w-4 h-4 text-[#4248ED]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{member.topCoachingItem}</span>
                    </div>
                    <div className="mt-1 text-xs text-gray-500 ml-6">
                      Last coached: {member.lastCoached}
                    </div>
                  </div>

                  {/* Expand indicator */}
                  <div className="flex items-center justify-center mt-2">
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        expandedMember === member.id ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Expanded Detail View */}
                {expandedMember === member.id && (
                  <TeamMemberDetail
                    member={member}
                    onClose={() => setExpandedMember(null)}
                  />
                )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Who to Coach Next */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <h3 className="font-semibold text-[#020247] mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Priority: Coach Next
            </h3>
            <div className="space-y-3">
              {teamMembers
                .filter(m => m.riskLevel === 'high')
                .map((member) => (
                  <div key={member.id} className="p-3 bg-red-50 rounded-lg border border-red-100">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-7 h-7 bg-red-200 rounded-full flex items-center justify-center text-red-700 font-semibold text-xs">
                        {member.avatar}
                      </div>
                      <span className="font-medium text-red-900">{member.name}</span>
                    </div>
                    <p className="text-xs text-red-700 mb-2">{member.topCoachingItem}</p>
                    {/* Evidence snippet */}
                    {member.coachingEvidence?.behaviorGaps?.[0]?.snippets?.[0] && (
                      <div className="pl-2 border-l-2 border-red-200 mt-2">
                        <p className="text-xs text-red-600 italic">
                          "{member.coachingEvidence.behaviorGaps[0].snippets[0].quote.slice(0, 80)}..."
                        </p>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>

          {/* Team Behavior Heatmap */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <h3 className="font-semibold text-[#020247] mb-4">Team Behavior Snapshot</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-gray-500">
                    <th className="text-left pb-2"></th>
                    <th className="pb-2 px-1">VB Pitch</th>
                    <th className="pb-2 px-1">Objection</th>
                    <th className="pb-2 px-1">Follow-up</th>
                  </tr>
                </thead>
                <tbody>
                  {teamMembers.slice(0, 5).map((member) => (
                    <tr key={member.id}>
                      <td className="py-1 font-medium">{member.name.split(' ')[0]}</td>
                      <td className="py-1 px-1 text-center">
                        <span className={`inline-block w-6 h-6 rounded ${
                          member.metrics.vbAdoption > 70 ? 'bg-green-200' :
                          member.metrics.vbAdoption > 55 ? 'bg-yellow-200' : 'bg-red-200'
                        }`}></span>
                      </td>
                      <td className="py-1 px-1 text-center">
                        <span className={`inline-block w-6 h-6 rounded ${
                          member.quartile <= 2 ? 'bg-green-200' : 'bg-yellow-200'
                        }`}></span>
                      </td>
                      <td className="py-1 px-1 text-center">
                        <span className={`inline-block w-6 h-6 rounded ${
                          member.sentiment === 'positive' ? 'bg-green-200' :
                          member.sentiment === 'neutral' ? 'bg-yellow-200' : 'bg-red-200'
                        }`}></span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-green-200 rounded"></span> Strong
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-yellow-200 rounded"></span> Developing
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 bg-red-200 rounded"></span> Needs Focus
                </div>
              </div>
            </div>
          </div>

          {/* Coverage Stats */}
          <div className="bg-gradient-to-br from-[#000099]/5 to-[#4248ED]/10 rounded-xl border border-[#000099]/10 p-4">
            <h3 className="font-semibold text-[#000099] mb-3">Coaching Activity</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Team Coverage</span>
                  <span className="font-semibold text-[#020247]">{teamStats.coachingCoverage}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#4248ED] rounded-full"
                    style={{ width: `${teamStats.coachingCoverage}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Oppies Captured</span>
                  <span className="font-semibold text-[#020247]">{Math.round(teamStats.oppiesCaptured / teamStats.oppiesRecommended * 100)}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${teamStats.oppiesCaptured / teamStats.oppiesRecommended * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
