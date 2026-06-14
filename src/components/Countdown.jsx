import { useCountdown } from '../hooks/useCountdown'
import './Countdown.css'

const UNITS = [
  { key: 'days', label: '일' },
  { key: 'hours', label: '시간' },
  { key: 'minutes', label: '분' },
  { key: 'seconds', label: '초' },
]

export default function Countdown({ targetIso, label }) {
  const t = useCountdown(targetIso)

  return (
    <div className="countdown" role="timer" aria-live="polite">
      <p className="countdown__label">{label}</p>
      {t.isPast ? (
        <p className="countdown__kickoff">⚽ 경기가 시작됐습니다!</p>
      ) : (
        <div className="countdown__grid">
          {UNITS.map(({ key, label }) => (
            <div className="countdown__cell" key={key}>
              <span className="countdown__num">{String(t[key]).padStart(2, '0')}</span>
              <span className="countdown__unit">{label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
