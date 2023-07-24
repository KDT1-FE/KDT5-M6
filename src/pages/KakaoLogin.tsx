import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const [APIKEY, REDIRECT_URI] = [
  import.meta.env.VITE_APIKEY,
  import.meta.env.VITE_REDIRECT_URI
]

const request = axios.create({
  baseURL: 'https://kauth.kakao.com',
  headers: {
    'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
})

export const KakaoLogin = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const KAKAO_CODE = location.search.split('=')[1]

  const getToken = async () => {
    try {
      const { data } = await request.post(
        '/oauth/token',
        `grant_type=authorization_code&client_id=${APIKEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`
      )
      if (data.access_token) {
        localStorage.setItem('token', data.access_token)
        navigate('/')
      } else {
        navigate('/signin')
      }
      return data
    } catch (error) {
      console.warn(error)
      console.warn('fail')
      return false
    }
  }
  useEffect(() => {
    if (!location.search) return
    getToken()
  }, [])

  return <div>KakaoLogin</div>
}
