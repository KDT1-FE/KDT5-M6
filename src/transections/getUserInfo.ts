import type { SanityUserInfoResponse, User } from '@/types/api'

import { YOLO_USER_DOC_TYPE } from '@/constants/constants'
import client from '@/service/sanity'

export async function getUserByEamilTransaction(email: string) {
  try {
    if (!email) throw new Error('이메일을 입력해주세요.')

    const userInfo: SanityUserInfoResponse[] = await client.fetch(
      `*[_type == "${YOLO_USER_DOC_TYPE}" && email == "${email}"]`
    )
    if (userInfo.length !== 1) throw new Error('증복 가입된 이메일 입니다. 관리자에게 문의해주세요.')
    const userInfoResponse: User = {
      userId: userInfo[0]._id,
      name: userInfo[0].name,
      email: userInfo[0].email,
      image: userInfo[0].image
    }
    return userInfoResponse
  } catch (error) {
    console.error(error)
    return []
  }
}
