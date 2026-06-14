import { useEffect, useState } from 'react'
import './PlayerCard.css'

const POS_LABEL = { GK: 'GK', DF: 'DF', MF: 'MF', FW: 'FW' }

// 사진 파일 네이밍 규칙: /players/{국가코드}_{등번호}.{jpg|jpeg|png}
// 예) 손흥민(kor, 7번) → /players/kor_7.jpg
const PHOTO_EXTS = ['jpg', 'jpeg', 'png']

function PlayerAvatar({ player, teamId }) {
  // 배포 하위 경로(BASE_URL) 대응. 개발=/, 배포=/worldcup-2026-kor/
  const base = import.meta.env.BASE_URL
  // 우선순위: ① 내가 올린 규칙 파일  ② players.json의 photo URL  ③ 등번호 아바타
  const candidates = [
    ...PHOTO_EXTS.map((ext) => `${base}players/${teamId}_${player.number}.${ext}`),
    ...(player.photo ? [player.photo] : []),
  ]
  const [idx, setIdx] = useState(0)

  if (idx < candidates.length) {
    return (
      <div className="player-card__avatar">
        <img
          src={candidates[idx]}
          alt={player.name}
          loading="lazy"
          onError={() => setIdx(idx + 1)}
        />
      </div>
    )
  }
  return (
    <div className={`player-card__avatar player-card__avatar--fallback pos-bg--${player.pos}`}>
      <span className="player-card__avatar-num">{player.number}</span>
    </div>
  )
}

function Badges({ player, isKorea }) {
  return (
    <div className="player-card__badges">
      {player.captain && <span className="player-card__badge badge--captain">주장 (C)</span>}
      {player.watch && (
        isKorea
          ? <span className="player-card__badge badge--key">⭐ 핵심</span>
          : <span className="player-card__badge badge--watch">⚠ 주의</span>
      )}
    </div>
  )
}

// 클릭 시 뜨는 상세 모달
function PlayerModal({ player, teamId, isKorea, country, flag, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="player-modal" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="player-modal__box" onClick={(e) => e.stopPropagation()}>
        <button className="player-modal__close" aria-label="닫기" onClick={onClose}>✕</button>

        {country && (
          <div className="player-card__country">
            <span className="player-card__country-flag">{flag}</span>
            <span className="player-card__country-name">{country}</span>
          </div>
        )}

        <PlayerAvatar player={player} teamId={teamId} />

        <h3 className="player-card__name">
          {player.name} <span className="player-card__shirt">#{player.number}</span>
        </h3>
        <p className="player-card__en">{player.nameEn}</p>

        <div className="player-modal__badges">
          <span className={`player-card__pos pos--${player.pos}`}>{POS_LABEL[player.pos]}</span>
          <Badges player={player} isKorea={isKorea} />
        </div>

        <p className="player-card__club">{player.club} · <span>{player.league}</span></p>

        <ul className="player-card__stats">
          <li><span>나이</span><strong>{player.age}세</strong></li>
          <li><span>키</span><strong>{player.height}cm</strong></li>
          <li><span>A매치</span><strong>{player.caps}</strong></li>
          <li><span>A매치 골</span><strong>{player.goals}</strong></li>
        </ul>

        <p className="player-card__note">{player.note}</p>
      </div>
    </div>
  )
}

/**
 * 선수 카드(요약). 클릭하면 상세 모달이 열린다.
 * 선수 분석(A조)과 조별 주장 프로필에서 공용으로 사용.
 */
export default function PlayerCard({ player, teamId, isKorea, country, flag }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        className={`player-card player-card--compact ${player.watch ? 'is-watch' : ''} ${isKorea ? 'is-korea' : ''}`}
        onClick={() => setOpen(true)}
        aria-label={`${player.name} 상세 보기`}
      >
        {country && (
          <div className="player-card__country">
            <span className="player-card__country-flag">{flag}</span>
            <span className="player-card__country-name">{country}</span>
          </div>
        )}

        <PlayerAvatar player={player} teamId={teamId} />

        <h4 className="player-card__name">
          {player.name} <span className="player-card__shirt">#{player.number}</span>
        </h4>
        <p className="player-card__club player-card__club--compact">{player.club}</p>

        <span className="player-card__more">자세히 ›</span>
      </button>

      {open && (
        <PlayerModal
          player={player}
          teamId={teamId}
          isKorea={isKorea}
          country={country}
          flag={flag}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}
