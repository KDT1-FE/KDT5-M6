import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { Input } from 'components/index'
import { useStore } from '@/store'

export const Login = () => {
  const auth = getAuth()
  const provider = new GoogleAuthProvider()
  const navigate = useNavigate()

  const setUserData = useStore(state => state.setUserData)

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  // 로그인 상태 확인 후 페이지 이동
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        navigate('/')
      } else {
        navigate('/login')
      }
    })
  }, [auth, navigate])

  //구글 로그인 처리
  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then(result => {
        setUserData(result.user)
      })
      .catch(error => {
        console.log(error)
      })
  }

  // 이메일 로그인 처리
  const handleEmailLogin = () => {
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then(result => {
        setUserData(result.user)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <Container>
      <Title>똑플</Title>
      <Line />
      <MainLogo
        src="/free-icon-piggy-bank-7549126.png"
        alt="돼지 로고"
      />
      <Box>
        <Input
          type="email"
          placeholder="이메일 입력"
          onChange={e => {
            setLoginEmail(e.target.value)
          }}
        />
        <Input
          type="password"
          placeholder="비밀번호 입력"
          onChange={e => {
            setLoginPassword(e.target.value)
          }}
        />
        <LoginButton onClick={handleEmailLogin}>로그인</LoginButton>

        <SignUpLink to="/login/signup">회원가입</SignUpLink>
        <GoogleLogin onClick={handleAuth}>
          <GoogleLogo
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="구글 로고"
          />
          <span>구글로 간편 로그인!</span>
        </GoogleLogin>
      </Box>
    </Container>
  )
}

const Container = styled.div`
  max-width: 768px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 20px;
  position: relative;
`

const Title = styled.h1`
  font-size: 48px;
  margin-top: 30px;
  color: var(--color-white);
`

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--color-white);
  margin-top: 30px;
`

const MainLogo = styled.img`
  width: 180px;
  height: 180px;
  margin-top: 30px;
`

const Box = styled.div`
  background-color: var(--color-white);
  width: 300px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  border-radius: 8px;

  input {
    border-radius: 4px;
  }
`

const SignUpLink = styled(Link)`
  font-size: 14px;
  color: var(--color-primary);
  text-decoration: none;
  margin-top: 10px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const GoogleLogin = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  margin-top: 20px;
  cursor: pointer;
  height: 40px;
  padding: 0 10px;
`

const GoogleLogo = styled.img`
  width: 20px;
  height: 20px;
`

const LoginButton = styled.button`
  outline: none;
  border: none;
  height: 40px;
  background-color: #7b68ee;
  color: var(--color-white);
  border-radius: 4px;
`
