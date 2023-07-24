import styled from 'styled-components'
import kakaobutton from '../assets/kakao_login_medium_wide.png'
import logo from '../assets/logo_gradi.png'
import { NavLink } from 'react-router-dom'

export const SignIn = () => {
  const [APIKEY, REDIRECT_URI] = [
    import.meta.env.VITE_APIKEY,
    import.meta.env.VITE_REDIRECT_URI
  ]

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${APIKEY}&redirect_uri=${REDIRECT_URI}
  `
  const handleSignIn = () => {
    window.location.href = KAKAO_AUTH_URL
  }
  return (
    <Wrapper>
      <Logo />
      <Title>SAVEWALLET</Title>
      <KakaoButton onClick={handleSignIn}></KakaoButton>
      <HomeButton to="/">돌아가기</HomeButton>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  min-height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 2rem;
  background-color: #ededed;
`

const Logo = styled.div`
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
  background-image: url(${logo});
  background-size: contain;
`

const Title = styled.span`
  font-size: 24px;
  color: #2d2c2c;
  font-weight: bold;
  margin-bottom: 50px;
`

const KakaoButton = styled.div`
  width: 280px;
  height: 45px;
  font-size: 18px;
  border: none;
  border-radius: 12px;
  background-color: #fee500;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #191919;
  background-image: url(${kakaobutton});
  margin-bottom: 10px;
`

const HomeButton = styled(NavLink)`
  box-sizing: border-box;
  width: 280px;
  height: 45px;
  background-color: transparent;
  border: 1px solid #6471e9;
  outline: none;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: #362f2f;
  font-size: 14px;
  font-weight: 600;
`
