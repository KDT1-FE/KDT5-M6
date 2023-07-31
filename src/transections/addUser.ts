import client from '@/service/sanity'
import { YOLO_USER_DOC_TYPE } from '@/constants/constants'

type User = {
  id: string
  name: string
  email: string
  image: string
}

export async function addUser({ id, name, email, image }: User) {
  try {
    return await client.createIfNotExists({
      _id: id,
      _type: YOLO_USER_DOC_TYPE,
      name,
      email,
      image
    })
  } catch (error) {
    console.error(error)
  }
}
