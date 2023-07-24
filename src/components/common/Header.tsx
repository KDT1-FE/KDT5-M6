import styled from "styled-components";
import { IoMdSunny, IoMdMoon } from "react-icons/io";

interface IHeaderProps {
  isLight: boolean;
  onToggleDark: () => void;
}

function Header({ isLight, onToggleDark }: IHeaderProps) {
  return (
    <HeaderContainer>
      <HeaderContent>
        <HeaderTitle>Keep</HeaderTitle>
      </HeaderContent>
      <HeaderToggleBtn onClick={onToggleDark}>
        {isLight ? <IoMdSunny size={30} /> : <IoMdMoon size={30} />}
      </HeaderToggleBtn>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  width: 100%;
  height: 70px;
  background: ${(props) => props.theme.bgColor};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  position: relative;
`;

const HeaderContent = styled.div`
  width: 1320px;
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderToggleBtn = styled.button`
  background-color: rgba(0, 0, 0, 0);
  position: absolute;
  top: 15px;
  right: 15px;
`;

const HeaderTitle = styled.h1`
  @font-face {
    font-family: "HakgyoansimGaeulsopungB";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/HakgyoansimGaeulsopungB.woff2")
      format("woff2");
    font-weight: 700;
    font-style: normal;
  }
  font-family: "HakgyoansimGaeulsopungB", sans-serif;
  font-size: 4rem;
  color: #a55eea;
`;
export default Header;
