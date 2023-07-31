import { atom } from 'recoil'

export const selectedCategoryState = atom<string | null>({
  key: 'selectedCategoryState',
  default: null
})
