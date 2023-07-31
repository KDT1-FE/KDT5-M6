import { styled } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { User, getAuth, signOut } from 'firebase/auth'
import { AiOutlineLogout } from 'react-icons/ai'
import { useStore } from '@/store'

export const Logout = () => {
  const auth = getAuth()
  const navigate = useNavigate()

  // 초기 사용자 데이터 설정
  const userData = useStore(state => state.userData)
  const setUserData = useStore(state => state.setUserData)

  // 로그아웃 처리
  const handleLogOut = () => {
    signOut(auth)
    setUserData({} as User)
    localStorage.removeItem('userData')
    navigate('/login')
  }

  return (
    <>
      {userData.email && (
        <TabItem>
          <AiOutlineLogout onClick={handleLogOut} />
        </TabItem>
      )}
    </>
  )
}

const TabItem = styled.li`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 24px;
  cursor: pointer;
`
