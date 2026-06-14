import Countdown from './Countdown'
import matchesData from '../data/matches.json'
import teamsData from '../data/teams.json'
import './Hero.css'

export default function Hero() {
  // 결과가 아직 없는 다음 경기 (없으면 마지막 경기)
  const nextMatch =
    matchesData.matches.find((m) => m.result == null) ??
    matchesData.matches[matchesData.matches.length - 1]
  const { start, end } = teamsData.meta.groupStage

  const fmt = (iso) =>
    new Date(iso).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })

  return (
    <header className="hero" id="top">
      <div className="hero__overlay" />
      <div className="container hero__inner">
        <p className="hero__eyebrow">FIFA WORLD CUP 2026 · 🇺🇸 🇨🇦 🇲🇽</p>

        <h1 className="hero__title">
          북중미 월드컵,<br />
          <span className="hero__accent">대한민국</span>과 함께
        </h1>

        <p className="hero__sub">
          48개국이 펼치는 사상 최대 규모의 월드컵.<br />
          대한민국 <strong>A조</strong>의 모든 것을 한눈에.
        </p>

        <div className="hero__meta">
          <div className="hero__meta-item">
            <span className="hero__meta-label">조별리그</span>
            <span className="hero__meta-value">{fmt(start)} ~ {fmt(end)}</span>
          </div>
          <div className="hero__meta-item">
            <span className="hero__meta-label">대한민국</span>
            <span className="hero__meta-value">A조</span>
          </div>
          <div className="hero__meta-item">
            <span className="hero__meta-label">개최</span>
            <span className="hero__meta-value">미국·캐나다·멕시코</span>
          </div>
        </div>

        <div className="hero__countdown">
          <Countdown
            targetIso={nextMatch.kickoffKst}
            label={`대한민국 다음 경기 (vs ${nextMatch.opponent} ${nextMatch.opponentFlag}) 까지`}
          />
        </div>

        <div className="hero__cta">
          <a className="btn btn--primary" href="#schedule">경기 일정 보기</a>
          <a className="btn btn--ghost" href="#group">A조 분석</a>
        </div>
      </div>
    </header>
  )
}
