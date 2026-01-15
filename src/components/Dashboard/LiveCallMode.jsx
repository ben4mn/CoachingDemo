import { useState, useEffect } from 'react'
import LivePromptCard from './LivePromptCard'
import mockLiveCall from '../../data/mockLiveCall.json'

const STAGES = ['discovery', 'value', 'objection', 'close']
const STAGE_LABELS = {
  discovery: 'Discovery',
  value: 'Value Proposition',
  objection: 'Objection Handling',
  close: 'Close'
}

export default function LiveCallMode({ onEndCall }) {
  const [currentStage, setCurrentStage] = useState('discovery')
  const [elapsedTime, setElapsedTime] = useState(0)
  const { partner, callContext, stages, partnerHistory } = mockLiveCall

  // Timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const currentStageIndex = STAGES.indexOf(currentStage)
  const currentPrompts = stages[currentStage]?.prompts || []

  const handleNextStage = () => {
    const nextIndex = currentStageIndex + 1
    if (nextIndex < STAGES.length) {
      setCurrentStage(STAGES[nextIndex])
    }
  }

  const handlePrevStage = () => {
    const prevIndex = currentStageIndex - 1
    if (prevIndex >= 0) {
      setCurrentStage(STAGES[prevIndex])
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Live Call Header */}
      <div className="mb-6 bg-white rounded-xl border-2 border-[#4248ED] shadow-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Partner Avatar */}
            <div className="w-14 h-14 rounded-full bg-[#000099] text-white flex items-center justify-center text-xl font-bold">
              {partner.logo}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-[#020247]">{partner.name}</h1>
                <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-semibold rounded-full animate-pulse flex items-center gap-1">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  LIVE
                </span>
              </div>
              <p className="text-sm text-gray-600">{callContext.type} • {partner.region}</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Timer */}
            <div className="text-center">
              <p className="text-2xl font-mono font-bold text-[#020247]">{formatTime(elapsedTime)}</p>
              <p className="text-xs text-gray-500">Elapsed</p>
            </div>

            {/* End Call Button */}
            <button
              onClick={onEndCall}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />
              </svg>
              End Call
            </button>
          </div>
        </div>
      </div>

      {/* Stage Progress */}
      <div className="mb-6 bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Call Stage</h2>
          <p className="text-xs text-gray-500">{stages[currentStage]?.description}</p>
        </div>

        {/* Stage Stepper */}
        <div className="flex items-center justify-between">
          {STAGES.map((stage, index) => {
            const isActive = stage === currentStage
            const isCompleted = index < currentStageIndex

            return (
              <div key={stage} className="flex items-center flex-1">
                {/* Stage Circle */}
                <button
                  onClick={() => setCurrentStage(stage)}
                  className={`flex flex-col items-center ${index > 0 ? 'flex-1' : ''}`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      isActive
                        ? 'bg-[#4248ED] text-white ring-4 ring-[#4248ED]/20'
                        : isCompleted
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {isCompleted ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span
                    className={`mt-2 text-xs font-medium ${
                      isActive ? 'text-[#4248ED]' : isCompleted ? 'text-green-600' : 'text-gray-500'
                    }`}
                  >
                    {STAGE_LABELS[stage]}
                  </span>
                </button>

                {/* Connector Line */}
                {index < STAGES.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-2 rounded ${
                      index < currentStageIndex ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            )
          })}
        </div>

        {/* Stage Navigation Buttons */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={handlePrevStage}
            disabled={currentStageIndex === 0}
            className="px-3 py-1.5 text-sm text-gray-600 hover:text-[#4248ED] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous Stage
          </button>
          <button
            onClick={handleNextStage}
            disabled={currentStageIndex === STAGES.length - 1}
            className="px-3 py-1.5 text-sm text-[#4248ED] hover:text-[#000099] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
          >
            Next Stage
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Live Coaching Prompts - Main Column */}
        <div className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Live Coaching Suggestions
            </h2>
            <span className="text-xs text-gray-500">
              Last suggestion: {Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toString().padStart(2, '0')} ago
            </span>
          </div>

          <div className="space-y-4">
            {currentPrompts.map((prompt) => (
              <LivePromptCard
                key={prompt.id}
                prompt={prompt}
                onDismiss={(id) => console.log('Dismissed:', id)}
                onHelpful={(id) => console.log('Helpful:', id)}
              />
            ))}
          </div>

          {currentPrompts.length === 0 && (
            <div className="bg-gray-50 rounded-xl border border-gray-200 p-8 text-center">
              <p className="text-gray-500">No suggestions for this stage yet.</p>
            </div>
          )}
        </div>

        {/* Sidebar - Partner Context */}
        <div className="space-y-6">
          {/* Call Objectives */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Call Objectives
            </h3>
            <ul className="space-y-2">
              {callContext.objectives.map((obj, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="w-5 h-5 rounded-full bg-[#4248ED]/10 text-[#4248ED] flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {index + 1}
                  </span>
                  {obj}
                </li>
              ))}
            </ul>
          </div>

          {/* Partner Context */}
          <div className="bg-gradient-to-br from-[#000099]/5 to-[#4248ED]/10 rounded-xl border border-[#000099]/10 p-4">
            <h3 className="text-sm font-semibold text-[#000099] uppercase tracking-wide mb-3">
              Partner Context
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Account Tier:</span>
                <span className="font-medium text-[#020247]">{partner.accountTier}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">VB Adoption:</span>
                <span className="font-medium text-[#020247]">{partner.currentVBAdoption}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">YTD Bookings:</span>
                <span className="font-medium text-[#020247]">{partner.bookingsYTD.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Open Objections from History */}
          {partnerHistory.openObjections.length > 0 && (
            <div className="bg-yellow-50 rounded-xl border border-yellow-100 p-4">
              <h3 className="text-sm font-semibold text-yellow-700 uppercase tracking-wide mb-3 flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Open from Last Call
              </h3>
              <ul className="space-y-1.5">
                {partnerHistory.openObjections.map((objection, index) => (
                  <li key={index} className="text-sm text-yellow-800 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
                    {objection}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Topics that work */}
          <div className="bg-green-50 rounded-xl border border-green-100 p-4">
            <h3 className="text-sm font-semibold text-green-700 uppercase tracking-wide mb-3 flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Topics That Resonate
            </h3>
            <ul className="space-y-1.5">
              {partnerHistory.successfulTopics.map((topic, index) => (
                <li key={index} className="text-sm text-green-800 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
