import { useEffect, useState } from 'react'

/**
 * 목표 시각까지 남은 일/시/분/초를 반환한다.
 * @param {string} targetIso - ISO 8601 목표 시각 (예: "2026-06-16T05:00:00+09:00")
 */
export function useCountdown(targetIso) {
  const target = new Date(targetIso).getTime()
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(timer)
  }, [])

  const diff = Math.max(0, target - now)
  const isPast = target - now <= 0

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  return { days, hours, minutes, seconds, isPast }
}
