import "@/Components/Footer/Footer.scss";

export default function Footer () {
  return (
    <footer>
      <div className="inner">
        <div className="logo">
          <img src="/images/logo.png" alt="logo"/>
        </div>
        <div className="contents">
          <div>
            <div className="link">
              <li><a href='#'>소개</a></li>
              <li><a href='#'>이용약관</a></li>
              <li><a href='#'>개인정보처리방침</a></li>
              <li><a href='#'>이용안내</a></li>
            </div>
            <div className="infolist">
              <div>
                <p>법인명 : 영스템프</p>
                <p>사업자등록번호 : <span>123-45-1234</span></p>
              </div>
              <div>
                <p>주소 : 서울특별시 강남구 테헤란로 <span>231, 11</span>층</p>
                <p>개인정보보호책임자 : <span>6</span>조 그룹원들</p>
              </div>
              <div>
                <p>대표이사 : <span>6</span>조 그룹원들</p>
                <p><span>FAX : 02-1234-1234</span></p>
                <p>이메일주소 : <span>youngstamp@youngstamp.com</span></p>
              </div>
            </div>
            <div className="copyright">
              <span>Copyright © 2023 youngstamp. All Rights Reserved.</span>
            </div>
          </div>
          <div className="client">
            <h4>고객 서비스 센터 이용안내</h4>
            <h2>080-123-1234</h2>
            <a href='#'><span>1</span> : <span>1</span> 문의</a>
          </div>
        </div>
      </div>
    </footer>
  );
}