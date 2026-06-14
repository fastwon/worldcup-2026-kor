import data from '../data/changes.json'
import './ChangesSection.css'

export default function ChangesSection() {
  return (
    <section id="changes" className="section section--alt">
      <div className="container">
        <span className="section__eyebrow">What's New</span>
        <h2 className="section__title">2026 월드컵, 무엇이 달라졌나</h2>
        <p className="section__lead">
          2026 대회는 역사상 가장 큰 규모로 치러집니다. 본선을 보기 전에 알아두면 좋은 핵심 변화들.
        </p>

        {/* 하이라이트 카드 */}
        <div className="changes-highlights">
          {data.highlights.map((h, i) => (
            <article className="change-card" key={i}>
              <span className="change-card__emoji">{h.emoji}</span>
              <h3 className="change-card__title">{h.title}</h3>
              <p className="change-card__body">{h.body}</p>
            </article>
          ))}
        </div>

        {/* 이전 vs 2026 비교표 */}
        <h3 className="changes-subtitle">한눈에 보는 비교</h3>
        <div className="compare-table">
          <div className="compare-row compare-row--head">
            <span className="compare-cell compare-cell--label">항목</span>
            <span className="compare-cell compare-cell--before">이전 대회</span>
            <span className="compare-cell compare-cell--after">2026 대회</span>
          </div>
          {data.comparison.map((row, i) => (
            <div className="compare-row" key={i}>
              <span className="compare-cell compare-cell--label">{row.label}</span>
              <span className="compare-cell compare-cell--before">{row.before}</span>
              <span className="compare-cell compare-cell--after">{row.after}</span>
            </div>
          ))}
        </div>
        <p className="changes-note">
          💡 그래서 대한민국은 <strong>조 2위 이상(또는 3위 상위 8팀)</strong>이면 32강 토너먼트에 진출합니다.
        </p>
      </div>
    </section>
  )
}
