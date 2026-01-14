import { useState } from 'react'
import Header from './components/Shared/Header'
import Navigation from './components/Shared/Navigation'
import ICView from './components/Dashboard/ICView'
import ManagerView from './components/Dashboard/ManagerView'
import ConversationPanel from './components/Dashboard/ConversationPanel'
import AtlasChat from './components/Chat/AtlasChat'

function App() {
  const [activeTab, setActiveTab] = useState('my-coaching')
  const [chatOpen, setChatOpen] = useState(false)

  const renderContent = () => {
    switch (activeTab) {
      case 'my-coaching':
        return <ICView />
      case 'team-view':
        return <ManagerView />
      case 'conversations':
        return <ConversationPanel />
      default:
        return <ICView />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onOpenChat={() => setChatOpen(true)} />
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      <main className={`transition-all duration-300 ${chatOpen ? 'mr-[420px]' : ''}`}>
        {renderContent()}
      </main>

      {/* Chat Overlay */}
      {chatOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 sm:bg-transparent"
          onClick={() => setChatOpen(false)}
        />
      )}

      <AtlasChat isOpen={chatOpen} onClose={() => setChatOpen(false)} />

      {/* POC Badge */}
      <div className="fixed bottom-4 left-4 bg-[#020247] text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 shadow-lg">
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
        POC Demo - Fake Data
      </div>
    </div>
  )
}

export default App
