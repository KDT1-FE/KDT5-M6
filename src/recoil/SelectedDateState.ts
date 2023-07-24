import { atom } from 'recoil'
// Recoil의 상태를 표현하는 단위
// Atoms 업데이트 시 해당 Atom을 구독하는 모든 컴포넌트가 업데이트

export const selectedDateState = atom({
  // 디폴트값은 현재 월로 설정
  key: 'selectedDateState',
  default: { year: 2023, month: 7 }
})
