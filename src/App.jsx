import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ViewToggle from './components/ViewToggle'
import ChangesSection from './components/ChangesSection'
import ScheduleSection from './components/ScheduleSection'
import GroupSection from './components/GroupSection'
import PlayersSection from './components/PlayersSection'
import StoriesSection from './components/StoriesSection'
import OtherGroupsSection from './components/OtherGroupsSection'
import CaptainsSection from './components/CaptainsSection'
import ShareSection from './components/ShareSection'
import Footer from './components/Footer'

export default function App() {
  const [view, setView] = useState('kor') // 'kor' | 'others'

  const changeView = (next) => {
    setView(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Navbar view={view} onChangeView={changeView} />
      <Hero />
      <ViewToggle view={view} onChange={changeView} />

      {view === 'kor' ? (
        <main>
          {/* 판 깔기 → 대한민국/A조 블록 */}
          <ChangesSection />
          <ScheduleSection />
          <GroupSection />
          <PlayersSection />
          <StoriesSection />
        </main>
      ) : (
        <main>
          {/* 다른 조: 화제거리 + 조별 주장 프로필 */}
          <OtherGroupsSection />
          <CaptainsSection />
        </main>
      )}

      <ShareSection />
      <Footer />
    </>
  )
}
