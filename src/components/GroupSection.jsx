import teamsData from '../data/teams.json'
import './GroupSection.css'

const SCENARIOS = [
  {
    icon: '🎯',
    title: '핵심 길목 — 체코·남아공전',
    desc: '시드팀 멕시코를 제외한 체코·남아공과의 두 경기에서 승점을 최대한 챙기는 것이 토너먼트(32강) 진출의 분수령이다. 1차전 체코전 승리로 좋은 출발을 끊었다.',
  },
  {
    icon: '⚔️',
    title: '개최국 멕시코의 벽',
    desc: '홈 관중을 등에 업은 멕시코는 조 최강 전력. 무실점 또는 비기는 결과만 따내도 토너먼트가 가까워진다.',
  },
  {
    icon: '🚀',
    title: '손흥민 의존도 분산',
    desc: '이강인의 창의성과 황희찬·오현규의 침투가 살아나면, 상대의 손흥민 집중 견제를 무력화할 수 있다.',
  },
]

export default function GroupSection() {
  const { teams } = teamsData

  return (
    <section id="group" className="section section--alt">
      <div className="container">
        <span className="section__eyebrow">Group A</span>
        <h2 className="section__title">A조 분석</h2>
        <p className="section__lead">
          대한민국이 속한 A조. 개최국 멕시코를 비롯한 4팀이 32강 진출권을 놓고 경쟁합니다.
        </p>

        {/* 팀별 전력 요약 (FIFA 랭킹 포함) */}
        <div className="group-cards">
          {teams.map((team) => (
            <article
              key={team.id}
              className={`group-card ${team.isKorea ? 'is-korea' : ''}`}
            >
              <div className="group-card__header">
                <span className="group-card__flag">{team.flag}</span>
                <div className="group-card__headtext">
                  <h4 className="group-card__name">{team.name}</h4>
                  <span className="group-card__tagline">{team.tagline}</span>
                </div>
                {team.fifaRank && (
                  <span className="group-card__rank">
                    <small>FIFA</small>{team.fifaRank}위
                  </span>
                )}
              </div>
              <p className="group-card__summary">{team.summary}</p>
            </article>
          ))}
        </div>

        <p className="group-cards__note">
          ※ FIFA 랭킹은 <strong>2026년 6월 16일 기준</strong>입니다 (출처:{' '}
          <a href="https://www.fifa.com/fifa-world-ranking/" target="_blank" rel="noopener noreferrer">FIFA 공식 랭킹</a>).
          랭킹은 경기 결과에 따라 수시로 변동될 수 있습니다.
        </p>

        {/* 32강 진출 시나리오 */}
        <h3 className="group__subtitle">대한민국 32강 진출 시나리오</h3>
        <p className="group__hint">
          2026 월드컵은 48개국·12개조 체제. 각 조 <strong>1·2위(24팀)</strong>와
          <strong> 3위 중 상위 8팀</strong>이 32강에 진출합니다. (즉 조 3위로도 진출 가능)
        </p>
        <div className="scenario-grid">
          {SCENARIOS.map((s) => (
            <article key={s.title} className="scenario-card">
              <span className="scenario-card__icon">{s.icon}</span>
              <h4 className="scenario-card__title">{s.title}</h4>
              <p className="scenario-card__desc">{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
