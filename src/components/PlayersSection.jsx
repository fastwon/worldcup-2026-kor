import { useState } from 'react'
import teamsData from '../data/teams.json'
import playersData from '../data/players.json'
import PlayerCard from './PlayerCard'
import './PlayersSection.css'

// 대한민국을 맨 앞으로 정렬
const ORDERED_TEAMS = [...teamsData.teams].sort(
  (a, b) => (b.isKorea ? 1 : 0) - (a.isKorea ? 1 : 0)
)

export default function PlayersSection() {
  const [activeId, setActiveId] = useState(
    ORDERED_TEAMS[0].id // 대한민국
  )
  const activeTeam = ORDERED_TEAMS.find((t) => t.id === activeId)
  const players = playersData.players[activeId] ?? []

  return (
    <section id="players" className="section">
      <div className="container">
        <span className="section__eyebrow">Players</span>
        <h2 className="section__title">주요 선수 분석</h2>
        <p className="section__lead">
          A조 각 팀의 핵심 선수. 대한민국은 <strong>⭐ 핵심</strong>, 상대팀은 대한민국이
          <strong> 주의해야 할 선수</strong>를 ⚠ 로 표시했습니다.
          <br />
          <small>선정 기준: 외신 주목 선수 → 5대리그 출신 순, 팀당 3~6명</small>
        </p>

        {/* 팀 탭 */}
        <div className="players-tabs" role="tablist">
          {ORDERED_TEAMS.map((team) => (
            <button
              key={team.id}
              role="tab"
              aria-selected={team.id === activeId}
              className={`players-tab ${team.id === activeId ? 'is-active' : ''} ${team.isKorea ? 'is-korea' : ''}`}
              onClick={() => setActiveId(team.id)}
            >
              <span className="players-tab__flag">{team.flag}</span>
              <span className="players-tab__name">{team.name}</span>
            </button>
          ))}
        </div>

        {/* 팀 소개 */}
        <div className="players-teamhead">
          <h3>
            {activeTeam.flag} {activeTeam.name}
            {activeTeam.isKorea && <span className="players-teamhead__tag">우리 대표팀</span>}
          </h3>
          <p>{activeTeam.summary}</p>
        </div>

        {/* 선수 그리드 */}
        <div className="players-grid">
          {players.map((p) => (
            <PlayerCard key={p.nameEn} player={p} teamId={activeId} isKorea={activeTeam.isKorea} />
          ))}
        </div>

        <p className="players-note">
          등번호·A매치 기록은 2026 월드컵 공식 명단 기준 (나이·키는 근사값일 수 있음).
          <br />
          일부 선수 사진 출처: 위키미디어 공용(Wikimedia Commons, CC 라이선스).
        </p>
      </div>
    </section>
  )
}
