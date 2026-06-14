import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__title">⚽ 2026 북중미 월드컵 with 대한민국</p>
        <p className="footer__note">
          대한민국 대표팀을 응원하는 비공식 정보·홍보 페이지입니다.
          경기 일정·선수 정보는 공식 발표에 따라 변동될 수 있습니다.
        </p>
        <p className="footer__copy">© 2026 · 데이터 출처: FIFA / KFA</p>
      </div>
    </footer>
  )
}
