import "@/Components/Header/Header.scss";
import "@/Common/Styles/global.scss";
import SearchIput from "../Search/Component/SearchIput";

export default function Header() {

  return (
    <header>
      <div className="inner">
        <div className="logo">
          <a href="/">
            <img src="/images/logo.png" alt="logo" />
          </a>
        </div>
        <div className="gnb">
          <SearchIput />
        </div>
      </div>
    </header>
  );
}
