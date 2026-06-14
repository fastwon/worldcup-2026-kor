import './ViewToggle.css'

const VIEWS = [
  { id: 'kor', label: '🇰🇷 대한민국 A조' },
  { id: 'others', label: '🌍 다른 조' },
]

export default function ViewToggle({ view, onChange }) {
  return (
    <div className="viewtoggle">
      <div className="viewtoggle__inner" role="tablist" aria-label="화면 전환">
        {VIEWS.map((v) => (
          <button
            key={v.id}
            role="tab"
            aria-selected={view === v.id}
            className={`viewtoggle__btn ${view === v.id ? 'is-active' : ''}`}
            onClick={() => onChange(v.id)}
          >
            {v.label}
          </button>
        ))}
      </div>
    </div>
  )
}
