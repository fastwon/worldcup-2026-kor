import captainsData from '../data/captains.json'
import PlayerCard from './PlayerCard'
import './CaptainsSection.css'

function PendingCard({ team }) {
  return (
    <article className="captain-pending">
      <span className="captain-pending__flag">{team.flag}</span>
      <h4 className="captain-pending__country">{team.country}</h4>
      <p className="captain-pending__msg">주장 정보 확인 중</p>
      <span className="captain-pending__tag">데이터 추가 예정</span>
    </article>
  )
}

export default function CaptainsSection() {
  return (
    <section id="captains" className="section section--alt">
      <div className="container">
        <span className="section__eyebrow">Captains</span>
        <h2 className="section__title">조별 주장 프로필</h2>
        <p className="section__lead">
          다른 조의 화제를 모은 팀들. 각 조 4개국의 <strong>주장</strong>을 선수 카드와 같은 형태로 소개합니다.
          <br />
          <small>화제 조부터 우선 정리했으며, 나머지 조는 순차적으로 추가됩니다.</small>
        </p>

        {captainsData.groups.map((g) => (
          <div className="captains-group" key={g.group}>
            <div className="captains-group__head">
              <h3 className="captains-group__name">{g.group}</h3>
              <span className="captains-group__tag">{g.tag}</span>
            </div>
            <div className="captains-grid">
              {g.teams.map((team) =>
                team.pending ? (
                  <PendingCard key={team.code} team={team} />
                ) : (
                  <PlayerCard
                    key={team.code}
                    player={team.player}
                    teamId={team.code}
                    isKorea={false}
                    country={team.country}
                    flag={team.flag}
                  />
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
