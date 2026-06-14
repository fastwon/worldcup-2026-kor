import matchesData from '../data/matches.json'
import venuesData from '../data/venues.json'
import './ScheduleSection.css'

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']

function formatKst(iso) {
  const d = new Date(iso)
  const month = d.getMonth() + 1
  const day = d.getDate()
  const weekday = WEEKDAYS[d.getDay()]
  const time = d.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
  return { date: `${month}월 ${day}일 (${weekday})`, time }
}

const OUTCOME = {
  '승': { label: '승', cls: 'is-win' },
  '무': { label: '무', cls: 'is-draw' },
  '패': { label: '패', cls: 'is-loss' },
}

function MatchCard({ match }) {
  const { date, time } = formatKst(match.kickoffKst)
  const hasResult = match.result != null
  const outcome = OUTCOME[match.outcome]
  const venue = venuesData.venues[match.venue]

  // 경기 종료 판정: 결과가 입력됐거나, 킥오프 후 약 2.5시간이 지났으면 종료로 간주.
  // → 미리 넣어둔 하이라이트·기사 검색 링크가 경기 후 자동으로 노출됨(푸시 불필요).
  const FINISH_BUFFER_MS = 2.5 * 60 * 60 * 1000
  const finished =
    hasResult || Date.now() >= new Date(match.kickoffKst).getTime() + FINISH_BUFFER_MS
  const showLinks = finished && match.links?.length > 0

  return (
    <article className={`match-card ${hasResult ? 'match-card--done' : ''}`}>
      <div className="match-card__round">{match.round}</div>

      <div className="match-card__teams">
        <div className="match-card__team">
          <span className="match-card__flag">🇰🇷</span>
          <span className="match-card__name">대한민국</span>
        </div>

        <div className="match-card__center">
          {hasResult ? (
            <span className="match-card__score">{match.result}</span>
          ) : (
            <span className="match-card__vs">VS</span>
          )}
        </div>

        <div className="match-card__team">
          <span className="match-card__flag">{match.opponentFlag}</span>
          <span className="match-card__name">{match.opponent}</span>
        </div>
      </div>

      <div className="match-card__info">
        <div className="match-card__when">
          <span className="match-card__date">{date}</span>
          <span className="match-card__time">{time} <small>KST</small></span>
          {match.localKickoff && (
            <span className="match-card__local">{match.localKickoff}</span>
          )}
        </div>
        <div className="match-card__venue">
          <span className="match-card__venue-name">🏟️ {match.venue}</span>
          {venue && (
            <span className="match-card__venue-loc">
              {venue.countryFlag} {venue.city} · 해발 {venue.altitude.toLocaleString()}m
            </span>
          )}
        </div>
      </div>

      {outcome && (
        <span className={`match-card__badge match-card__badge--${outcome.cls}`}>
          {outcome.label}
        </span>
      )}

      {showLinks && (
        <div className="match-card__links">
          <span className="match-card__links-title">📺 경기 후 정보</span>
          {!hasResult && (
            <span className="match-card__links-hint">결과(스코어)는 업데이트 예정</span>
          )}
          {match.links.map((link) => (
            <a
              key={link.url}
              className={`match-link match-link--${link.type}`}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.type === 'highlight' ? '▶' : '📰'} {link.label}
            </a>
          ))}
        </div>
      )}
    </article>
  )
}

export default function ScheduleSection() {
  return (
    <section id="schedule" className="section">
      <div className="container">
        <span className="section__eyebrow">Schedule</span>
        <h2 className="section__title">대한민국 경기 일정</h2>
        <p className="section__lead">
          A조 조별리그 3경기. 시간은 한국시간(KST) 기준입니다.
        </p>

        <div className="schedule__grid">
          {matchesData.matches.map((m) => (
            <MatchCard key={m.id} match={m} />
          ))}
        </div>

        <p className="schedule__note">
          ✅ FIFA 공식 확정 일정입니다. 대한민국 3경기 모두 멕시코에서 열립니다.
        </p>
      </div>
    </section>
  )
}
