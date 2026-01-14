import { useState, useRef, useEffect } from 'react'
import chatData from '../../data/chatResponses.json'

export default function AtlasChat({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    { type: 'assistant', content: chatData.welcomeMessage }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handlePromptClick = (prompt) => {
    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: prompt.text }])
    setIsTyping(true)

    // Simulate typing delay then add response
    setTimeout(() => {
      setIsTyping(false)
      setMessages(prev => [...prev, {
        type: 'assistant',
        content: prompt.response.text,
        sources: prompt.response.sources,
        confidence: prompt.response.confidence
      }])
    }, 1500)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: inputValue }])
    setInputValue('')
    setIsTyping(true)

    // Generic response for custom questions
    setTimeout(() => {
      setIsTyping(false)
      setMessages(prev => [...prev, {
        type: 'assistant',
        content: "That's a great question! In the full version of Atlas, I would analyze your conversation data, Salesforce records, and performance metrics to give you a detailed answer. For now, try one of the suggested prompts to see how I can help.",
        sources: [{ type: 'Demo', label: 'POC Mode' }],
        confidence: 100
      }])
    }, 1500)
  }

  // Filter out prompts that have already been used
  const usedPrompts = messages.filter(m => m.type === 'user').map(m => m.content)
  const availablePrompts = chatData.prompts.filter(p => !usedPrompts.includes(p.text))

  if (!isOpen) return null

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[420px] bg-white shadow-2xl flex flex-col z-50">
      {/* Header */}
      <div className="bg-[#000099] text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#4248ED] rounded-full flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div>
            <div className="font-semibold">Ask Atlas</div>
            <div className="text-xs text-white/60">AI Coaching Assistant</div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-white/10 rounded transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message, idx) => (
          <div key={idx} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] ${
              message.type === 'user'
                ? 'bg-[#000099] text-white rounded-2xl rounded-br-md px-4 py-2'
                : 'bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm'
            }`}>
              {message.type === 'assistant' && (
                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-100">
                  <div className="w-6 h-6 bg-[#4248ED] rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-gray-500">Atlas</span>
                </div>
              )}

              <div className={`text-sm whitespace-pre-wrap ${message.type === 'assistant' ? 'text-gray-700' : ''}`}>
                {message.content.split('\n').map((line, i) => {
                  // Handle bold text
                  const parts = line.split(/(\*\*.*?\*\*)/g)
                  return (
                    <p key={i} className={i > 0 ? 'mt-2' : ''}>
                      {parts.map((part, j) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                          return <strong key={j}>{part.slice(2, -2)}</strong>
                        }
                        return part
                      })}
                    </p>
                  )
                })}
              </div>

              {/* Sources */}
              {message.sources && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Sources
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {message.sources.map((source, i) => (
                      <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                        {source.type}: {source.label}
                      </span>
                    ))}
                  </div>
                  {message.confidence && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs text-gray-500">Confidence:</span>
                      <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${message.confidence}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">{message.confidence}%</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-[#4248ED] rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1z" />
                  </svg>
                </div>
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts */}
      {availablePrompts.length > 0 && (
        <div className="px-4 py-3 border-t border-gray-200 bg-white">
          <div className="text-xs text-gray-500 mb-2">Suggested questions:</div>
          <div className="flex flex-wrap gap-2">
            {availablePrompts.slice(0, 3).map((prompt) => (
              <button
                key={prompt.id}
                onClick={() => handlePromptClick(prompt)}
                disabled={isTyping}
                className="text-xs bg-[#000099]/10 text-[#000099] px-3 py-1.5 rounded-full hover:bg-[#000099]/20 transition-colors disabled:opacity-50"
              >
                {prompt.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask Atlas anything..."
            disabled={isTyping}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4248ED] focus:border-transparent disabled:bg-gray-100"
          />
          <button
            type="submit"
            disabled={isTyping || !inputValue.trim()}
            className="px-4 py-2 bg-[#000099] text-white rounded-lg hover:bg-[#020247] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  )
}
