import factsData from '../data/funfacts.json'
import './StoriesSection.css'

export default function StoriesSection() {
  return (
    <section id="stories" className="section section--alt">
      <div className="container">
        <span className="section__eyebrow">Stories</span>
        <h2 className="section__title">알아두면 더 재미있는 이야기</h2>
        <p className="section__lead">
          경기를 200% 즐기기 위한 A조와 대한민국 대표팀의 흥미로운 이야기들.
        </p>

        <div className="stories-grid">
          {factsData.facts.map((fact, i) => (
            <article className="story-card" key={i}>
              <span className="story-card__icon">{fact.icon}</span>
              <h3 className="story-card__title">{fact.title}</h3>
              <p className="story-card__body">{fact.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
