export default function PlaceholderSection({ id, eyebrow, title, desc, phase, alt }) {
  return (
    <section id={id} className={`section ${alt ? 'section--alt' : ''}`}>
      <div className="container">
        <span className="section__eyebrow">{eyebrow}</span>
        <h2 className="section__title">{title}</h2>
        <div className="section__placeholder">
          <p>{desc}</p>
          <span className="tag">{phase} 에서 구현 예정</span>
        </div>
      </div>
    </section>
  )
}
