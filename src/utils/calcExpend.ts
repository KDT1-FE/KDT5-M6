import { ICalendarResponse } from 'types/index'

export const calculateExpend = (list: ICalendarResponse[]) => {
  return list.reduce((acc, cur) => {
    if (cur.amount < 0) {
      acc -= cur.amount
    }
    return acc
  }, 0)
}

export const calculateExpendTotal = (list: number[]) => {
  return list.reduce((acc, cur) => {
    if (cur < 0) {
      acc -= cur
    }
    return acc
  }, 0)
}
