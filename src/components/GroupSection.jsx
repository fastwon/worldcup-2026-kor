import teamsData from '../data/teams.json'
import './GroupSection.css'

// 3차전(vs 남아공, 6/25 KST) 경우의 수 — 2차전 종료 기준(멕시코6·한국3·체코1·남아공1)
const SCENARIOS = [
  {
    icon: '✅',
    title: '승리 시 — 조 2위 확정',
    desc: '남아공을 이기면 6점으로 조 2위 확정, 32강 직행. (멕시코는 1위 확정)',
  },
  {
    icon: '🤝',
    title: '무승부 시 — 그래도 2위 확정',
    desc: '4점. 체코가 멕시코를 꺾어 4점 동률이 돼도, 2026 월드컵은 골득실보다 맞대결(승자우선)이 먼저라 체코를 2-1로 이긴 한국이 2위.',
  },
  {
    icon: '⚠️',
    title: '패배 시 — 3위, 와일드카드 도전',
    desc: '남아공에 2위를 내주고 3위로. 각 조 3위 중 상위 8팀에 들어야 진출 (다른 조 결과에 좌우돼 불확실).',
  },
]

// 32강에서 만날 상대
const OPPONENTS = [
  {
    icon: '🅰️',
    title: '조 2위로 진출하면',
    desc: 'B조 2위와 대결. (B조: 캐나다·스위스·카타르·보스니아 중 2위)',
  },
  {
    icon: '🌀',
    title: '조 3위로 진출하면',
    desc: '상대가 최종 조합에 따라 정해짐 — B·D·E·G·I·K·L조 1위 중 하나. 프랑스·잉글랜드·포르투갈·독일·벨기에·미국 등 강팀 조 1위를 만날 수 있어 더 험난.',
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
        <h3 id="r32" className="group__subtitle">대한민국 32강 진출 시나리오</h3>
        <p className="group__hint">
          <strong>2차전 종료 현재</strong> — 멕시코 6점(1위 확정)·대한민국 3점(2위)·체코·남아공 각 1점.
          3차전은 <strong>vs 남아공 (6/25 KST)</strong>. 각 조 1·2위 + 3위 중 상위 8팀이 32강 진출.
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

        {/* 32강에서 만날 상대 */}
        <h3 className="group__subtitle">32강에서 만날 상대</h3>
        <div className="scenario-grid">
          {OPPONENTS.map((o) => (
            <article key={o.title} className="scenario-card">
              <span className="scenario-card__icon">{o.icon}</span>
              <h4 className="scenario-card__title">{o.title}</h4>
              <p className="scenario-card__desc">{o.desc}</p>
            </article>
          ))}
        </div>
        <p className="group-cards__note">
          ※ 대진은 2차전 종료 시점 기준이며, 32강 상대(특히 3위 진출 시)는 전 조 경기가 끝나는 6/27 이후 최종 확정됩니다.
        </p>
      </div>
    </section>
  )
}
