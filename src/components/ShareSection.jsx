import { useEffect, useState } from 'react'
import './ShareSection.css'

const SHARE_TEXT = '2026 북중미 월드컵, 대한민국 A조 정보를 한눈에! 함께 응원해요 🇰🇷⚽'

export default function ShareSection() {
  const [copied, setCopied] = useState(false)
  const [canNativeShare, setCanNativeShare] = useState(false)

  useEffect(() => {
    setCanNativeShare(typeof navigator !== 'undefined' && !!navigator.share)
  }, [])

  const pageUrl = typeof window !== 'undefined' ? window.location.href : ''

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const nativeShare = async () => {
    try {
      await navigator.share({ title: document.title, text: SHARE_TEXT, url: pageUrl })
    } catch {
      /* 사용자가 취소한 경우 무시 */
    }
  }

  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT)}&url=${encodeURIComponent(pageUrl)}`
  const threadsUrl = `https://www.threads.net/intent/post?text=${encodeURIComponent(`${SHARE_TEXT} ${pageUrl}`)}`

  return (
    <section id="share" className="share">
      <div className="container share__inner">
        <h2 className="share__title">대한민국 대표팀을 함께 응원해요! 🇰🇷</h2>
        <p className="share__desc">
          이 페이지가 도움이 되셨다면 친구들과 공유해 주세요.
        </p>

        <div className="share__buttons">
          {canNativeShare && (
            <button className="share-btn share-btn--native" onClick={nativeShare}>
              📱 공유하기
            </button>
          )}
          <a className="share-btn share-btn--x" href={xUrl} target="_blank" rel="noopener noreferrer">
            𝕏 X(트위터)
          </a>
          <a className="share-btn share-btn--threads" href={threadsUrl} target="_blank" rel="noopener noreferrer">
            @ Threads
          </a>
          <button className="share-btn share-btn--copy" onClick={copyLink}>
            {copied ? '✓ 복사됨!' : '🔗 링크 복사'}
          </button>
        </div>

        <p className="share__hint">
          📱 <strong>공유하기</strong> 버튼(모바일)에서 인스타그램·카카오톡으로도 공유할 수 있어요.
        </p>
      </div>
    </section>
  )
}
