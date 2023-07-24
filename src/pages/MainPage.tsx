import Header from "../components/common/Header";
import Main from "../components/Main";

interface IMainPageProps {
  isLight: boolean;
  onToggleDark: () => void;
}

function MainPage({ isLight, onToggleDark }: IMainPageProps) {
  return (
    <>
      <Header isLight={isLight} onToggleDark={onToggleDark} />
      <Main />
    </>
  );
}

export default MainPage;