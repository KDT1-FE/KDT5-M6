import { addUser } from '@/transections/addUser'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

// todo : closer로 userId 감싸서 전역변수로 사용하지 않도록 수정
let userId = ''

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID || '',
      clientSecret: process.env.GOOGLE_OAUTH_SECRET || ''
    })
  ],
  callbacks: {
    async session({ session }) {
      session.user.userId = userId
      return session
    },
    async signIn({ user: { id, name, email, image } }) {
      // * 로그인에 성공했으나 유저 정보가 없다면 반드시 false를 리턴해야 합니다.
      if (!id || !name || !email || !image) return false
      const res = await addUser({ id, name, email, image })
      if (!res) return false
      userId = res._id
      return true
    }
  }
  // pages: {
  //   signIn: '/auth/signin'
  // }
}
export default NextAuth(authOptions)
