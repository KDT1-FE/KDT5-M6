import useUserInfo from '@/hooks/useUserInfo'
import { signIn, signOut } from 'next-auth/react'
import LogoutIcon from './ui/icons/LogoutIcon'
import dynamic from 'next/dynamic'
import GoogleIcon from './ui/icons/GoogleIcon'
const Tooltip = dynamic(() => import('antd').then((res) => res.Tooltip), { ssr: false })

export default function Login() {
  const [userInfo] = useUserInfo()
  if (userInfo.userId) {
    return (
      <>
        <div className="mr-4">
          {userInfo.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="w-8 h-8 rounded-[1rem] mr-2 float-left" src={userInfo.image} alt="user profile" />
          )}
        </div>
        <div className="icon-base-style cursor-pointer">
          <Tooltip placement="bottom" title="로그 아웃">
            <LogoutIcon onClick={() => signOut()} />
            <span className="a11y">로그 아웃</span>
          </Tooltip>
        </div>
      </>
    )
  }

  return (
    <div className="icon-base-style cursor-pointer">
      <Tooltip placement="bottom" title="구글 로그인">
        <GoogleIcon onClick={() => signIn()} />
        <span className="a11y">로그인</span>
      </Tooltip>
    </div>
  )
}

// https://stackoverflow.com/questions/74180557/next-auth-next-autherrorclient-fetch-error-networkerror-when-attempting-to
