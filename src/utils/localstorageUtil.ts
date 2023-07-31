import { User } from '@firebase/auth'

export const getUserData = () => {
  const data = localStorage.getItem('userData') ?? ''
  return data ? (JSON.parse(data) as User) : null
}
