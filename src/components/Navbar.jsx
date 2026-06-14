import { useEffect, useState } from 'react'
import './Navbar.css'

// 뷰별 섹션 바로가기 링크
const LINKS_BY_VIEW = {
  kor: [
    { href: '#changes', label: '2026 변경점' },
    { href: '#schedule', label: '경기 일정' },
    { href: '#group', label: 'A조 분석' },
    { href: '#players', label: '선수 분석' },
    { href: '#stories', label: '이야기' },
  ],
  others: [
    { href: '#othergroups', label: '화제거리' },
    { href: '#captains', label: '조별 주장' },
  ],
}

export default function Navbar({ view, onChangeView }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = LINKS_BY_VIEW[view] ?? []

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <a
          href="#top"
          className="navbar__brand"
          onClick={() => {
            setOpen(false)
            onChangeView('kor')
          }}
        >
          <span className="navbar__brand-mark">⚽</span>
          <span className="navbar__brand-text">WC2026 <strong>KOR</strong></span>
        </a>

        <button
          className="navbar__toggle"
          aria-label="메뉴 열기"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? '✕' : '☰'}
        </button>

        <ul className={`navbar__links ${open ? 'is-open' : ''}`}>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setOpen(false)}>{link.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
