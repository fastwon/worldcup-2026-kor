import data from '../data/othergroups.json'
import './OtherGroupsSection.css'

export default function OtherGroupsSection() {
  return (
    <section id="othergroups" className="section">
      <div className="container">
        <span className="section__eyebrow">Other Groups</span>
        <h2 className="section__title">다른 조에서 벌어지는 일들</h2>
        <p className="section__lead">
          대한민국이 속한 A조 밖에서도 흥미로운 이야기가 가득합니다. 다른 조의 화제거리를 모았습니다.
        </p>

        <div className="othergroups-grid">
          {data.topics.map((t, i) => (
            <article className="othergroup-card" key={i}>
              <div className="othergroup-card__head">
                <span className="othergroup-card__emoji">{t.emoji}</span>
                <span className="othergroup-card__group">{t.group}</span>
              </div>
              <h3 className="othergroup-card__title">{t.title}</h3>
              <p className="othergroup-card__body">{t.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
