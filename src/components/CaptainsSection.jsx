import captainsData from '../data/captains.json'
import PlayerCard from './PlayerCard'
import './CaptainsSection.css'

export default function CaptainsSection() {
  return (
    <section id="captains" className="section section--alt">
      <div className="container">
        <span className="section__eyebrow">Captains</span>
        <h2 className="section__title">조별 주장 프로필</h2>
        <p className="section__lead">
          A조를 제외한 11개 조, 각 조 4개국의 <strong>주장</strong>을 선수 카드와 같은 형태로 소개합니다.
        </p>

        {captainsData.groups.map((g) => (
          <div className="captains-group" key={g.group}>
            <div className="captains-group__head">
              <h3 className="captains-group__name">{g.group}</h3>
              <span className="captains-group__tag">{g.tag}</span>
            </div>
            <div className="captains-grid">
              {g.teams.map((team) => (
                <PlayerCard
                  key={team.code}
                  player={team.player}
                  teamId={team.code}
                  isKorea={false}
                  country={team.country}
                  flag={team.flag}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
