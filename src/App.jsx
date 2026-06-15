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

  // 히어로 CTA: 대한민국 뷰로 전환 후 해당 섹션의 '제목'이 고정 바 바로 아래 오도록 스크롤
  const goToKorSection = (anchor) => {
    setView('kor')
    setTimeout(() => {
      const section = document.querySelector(anchor)
      if (!section) return
      // 섹션 패딩 때문에 제목이 한참 아래 보이지 않도록, 제목(eyebrow) 위치 기준으로 정렬
      const heading = section.querySelector('.section__eyebrow') ?? section
      const navH = document.querySelector('.navbar')?.offsetHeight ?? 64
      const toggleH = document.querySelector('.viewtoggle')?.offsetHeight ?? 52
      const y = heading.getBoundingClientRect().top + window.scrollY - navH - toggleH - 12
      window.scrollTo({ top: y, behavior: 'smooth' })
    }, 60)
  }

  return (
    <>
      <Navbar view={view} onChangeView={changeView} />
      <Hero onNavigate={goToKorSection} />
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
