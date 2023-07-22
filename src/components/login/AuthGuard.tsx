import { useEffect, useState, ReactNode } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { Navigate } from 'react-router-dom'
import { LoadingSpinner } from 'components/index'
import styled from 'styled-components'

interface AuthGuardProps {
  children: ReactNode
  fallback?: ReactNode
}

export const AuthGuard = ({ children, fallback = <Navigate to="/login" /> }: AuthGuardProps) => {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const auth = getAuth()

  // 인증 상태 확인
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setIsLoggedIn(Boolean(user))
      setIsCheckingAuth(false)
    })
  }, [auth])

  if (isCheckingAuth) {
    return (
      <SpinnerWrapper>
        <LoadingSpinner />
      </SpinnerWrapper>
    )
  }

  return isLoggedIn ? <>{children}</> : <>{fallback}</>
}

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
