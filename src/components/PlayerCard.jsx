import { useState } from 'react'
import './PlayerCard.css'

const POS_LABEL = { GK: 'GK', DF: 'DF', MF: 'MF', FW: 'FW' }

// 사진 파일 네이밍 규칙: /players/{국가코드}_{등번호}.{jpg|jpeg|png}
// 예) 손흥민(kor, 7번) → /players/kor_7.jpg
const PHOTO_EXTS = ['jpg', 'jpeg', 'png']

function PlayerAvatar({ player, teamId }) {
  // 배포 하위 경로(BASE_URL) 대응. 개발=/, 배포=/worldcup-2026-kor/
  const base = import.meta.env.BASE_URL
  // 우선순위: ① 내가 올린 규칙 파일(public/players/{코드}_{번호}.{jpg|jpeg|png})
  //          ② players.json의 photo URL(예: 위키미디어)  ③ 등번호 아바타
  // → 직접 올린 사진이 항상 photo URL을 덮어쓴다.
  const candidates = [
    ...PHOTO_EXTS.map((ext) => `${base}players/${teamId}_${player.number}.${ext}`),
    ...(player.photo ? [player.photo] : []),
  ]
  const [idx, setIdx] = useState(0)

  // 후보 경로가 남아있으면 시도, 모두 실패하면 등번호 아바타로 대체
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

/**
 * 선수 카드. 선수 분석(A조)과 조별 주장 프로필에서 공용으로 사용.
 * @param player  선수 데이터 객체
 * @param teamId  사진 네이밍 규칙용 코드 (kor, arg ...)
 * @param isKorea 대한민국 팀이면 watch 뱃지를 '핵심'으로 표기
 */
export default function PlayerCard({ player, teamId, isKorea, country, flag }) {
  return (
    <article className={`player-card ${player.watch ? 'is-watch' : ''} ${isKorea ? 'is-korea' : ''}`}>
      {country && (
        <div className="player-card__country">
          <span className="player-card__country-flag">{flag}</span>
          <span className="player-card__country-name">{country}</span>
        </div>
      )}

      <div className="player-card__top">
        <span className={`player-card__pos pos--${player.pos}`}>{POS_LABEL[player.pos]}</span>
        <div className="player-card__badges">
          {player.captain && <span className="player-card__badge badge--captain">주장 (C)</span>}
          {player.watch && (
            isKorea
              ? <span className="player-card__badge badge--key">⭐ 핵심</span>
              : <span className="player-card__badge badge--watch">⚠ 주의</span>
          )}
        </div>
      </div>

      <PlayerAvatar player={player} teamId={teamId} />

      <h4 className="player-card__name">{player.name} <span className="player-card__shirt">#{player.number}</span></h4>
      <p className="player-card__en">{player.nameEn}</p>

      <p className="player-card__club">{player.club} · <span>{player.league}</span></p>

      <ul className="player-card__stats">
        <li><span>나이</span><strong>{player.age}세</strong></li>
        <li><span>키</span><strong>{player.height}cm</strong></li>
        <li><span>A매치</span><strong>{player.caps}</strong></li>
        <li><span>A매치 골</span><strong>{player.goals}</strong></li>
      </ul>

      <p className="player-card__note">{player.note}</p>
    </article>
  )
}
