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

  // 해당 섹션의 '제목'이 상단 고정 바(내비+토글) 바로 아래 오도록 정밀 스크롤
  const scrollToAnchor = (anchor) => {
    const el = document.querySelector(anchor)
    if (!el) return
    // 섹션 패딩 때문에 제목이 처지지 않도록, 제목(eyebrow) 위치 기준으로 정렬
    const heading = el.querySelector?.('.section__eyebrow') ?? el
    const navH = document.querySelector('.navbar')?.offsetHeight ?? 64
    const toggleH = document.querySelector('.viewtoggle')?.offsetHeight ?? 52
    const y = heading.getBoundingClientRect().top + window.scrollY - navH - toggleH - 12
    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  // 히어로 CTA: 대한민국 뷰로 전환 후 스크롤 (뷰 전환 렌더 후 실행)
  const goToKorSection = (anchor) => {
    setView('kor')
    setTimeout(() => scrollToAnchor(anchor), 60)
  }

  return (
    <>
      <Navbar view={view} onChangeView={changeView} onScrollTo={scrollToAnchor} />
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
