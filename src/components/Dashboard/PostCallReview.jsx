import { useState } from 'react'
import mockLiveCall from '../../data/mockLiveCall.json'
import mockCalls from '../../data/mockCalls.json'

export default function PostCallReview({ onComplete, onBack }) {
  // Use the first call's postCallData as template
  const callData = mockCalls.calls[0]
  const postCallData = callData.postCallData
  const { partner } = mockLiveCall

  const [crmFields, setCrmFields] = useState(postCallData.crmFields)
  const [emailBody, setEmailBody] = useState(postCallData.draftEmail.body)
  const [emailSubject, setEmailSubject] = useState(postCallData.draftEmail.subject)
  const [synced, setSynced] = useState(false)

  const toggleField = (index) => {
    const updated = [...crmFields]
    updated[index].selected = !updated[index].selected
    setCrmFields(updated)
  }

  const handleSync = () => {
    setSynced(true)
    setTimeout(() => {
      onComplete?.()
    }, 2000)
  }

  if (synced) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-green-50 rounded-xl border border-green-200 p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-green-800 mb-2">Sync Complete!</h2>
          <p className="text-green-700">CRM updated and follow-up email queued.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 text-gray-500 hover:text-[#4248ED] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-xl font-bold text-[#020247]">Review Before You Sync</h1>
            <p className="text-sm text-gray-600">Call with {partner.name} • Just ended</p>
          </div>
        </div>
        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm font-medium rounded-full">
          Pending Review
        </span>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Column - CRM Fields */}
        <div className="space-y-6">
          {/* Call Summary */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Call Summary
            </h2>
            <textarea
              className="w-full h-32 p-3 border border-gray-200 rounded-lg text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-[#4248ED]/20 focus:border-[#4248ED]"
              defaultValue={callData.summary}
            />
            <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Auto-generated from call transcript. Edit as needed.
            </p>
          </div>

          {/* CRM Fields */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              CRM Fields to Update
            </h2>
            <div className="space-y-3">
              {crmFields.map((field, index) => (
                <label
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={field.selected}
                    onChange={() => toggleField(index)}
                    className="w-4 h-4 text-[#4248ED] border-gray-300 rounded focus:ring-[#4248ED]"
                  />
                  <div className="flex-1">
                    <span className="text-xs text-gray-500 block">{field.field}</span>
                    <span className="text-sm font-medium text-[#020247]">{field.value}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Action Items */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Action Items
            </h2>
            <ul className="space-y-2">
              {callData.actionItems.map((item, index) => (
                <li key={index} className="flex items-center gap-3 p-2">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 text-[#4248ED] border-gray-300 rounded focus:ring-[#4248ED]"
                  />
                  <span className="text-sm text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column - Email Draft */}
        <div className="space-y-6">
          {/* Follow-up Email */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Draft Follow-up Email
            </h2>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-500 block mb-1">To</label>
                <input
                  type="text"
                  defaultValue={postCallData.draftEmail.to}
                  className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4248ED]/20 focus:border-[#4248ED]"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1">Subject</label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4248ED]/20 focus:border-[#4248ED]"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1">Message</label>
                <textarea
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  className="w-full h-48 p-3 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#4248ED]/20 focus:border-[#4248ED]"
                />
              </div>
            </div>
          </div>

          {/* Seismic Content Links */}
          <div className="bg-gradient-to-br from-[#000099]/5 to-[#4248ED]/10 rounded-xl border border-[#000099]/10 p-5">
            <h2 className="text-sm font-semibold text-[#000099] uppercase tracking-wide mb-3 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Suggested Content to Attach
            </h2>
            <div className="space-y-2">
              {postCallData.draftEmail.contentLinks.map((link, index) => (
                <label
                  key={index}
                  className="flex items-center gap-3 p-3 bg-white/50 rounded-lg cursor-pointer hover:bg-white/80 transition-colors"
                >
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 text-[#4248ED] border-gray-300 rounded focus:ring-[#4248ED]"
                  />
                  <div className="flex-1">
                    <span className="text-sm font-medium text-[#020247] block">{link.title}</span>
                    <span className="text-xs text-gray-500">{link.type}</span>
                  </div>
                  <svg className="w-4 h-4 text-[#4248ED]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex items-center justify-between p-4 bg-gray-50 rounded-xl">
        <button
          onClick={onBack}
          className="px-4 py-2 text-gray-600 hover:text-[#4248ED] transition-colors"
        >
          Skip Sync
        </button>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-white transition-colors">
            Edit More
          </button>
          <button
            onClick={handleSync}
            className="px-6 py-2 bg-[#000099] hover:bg-[#4248ED] text-white rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Approve & Sync
          </button>
        </div>
      </div>

      {/* Trust Footer */}
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
        <svg className="w-4 h-4 text-[#4248ED]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <span>Your data stays in your control. Review and edit before any sync.</span>
      </div>
    </div>
  )
}
